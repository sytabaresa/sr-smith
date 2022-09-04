import {
    interpret
} from './machine';
const {
    create,
    freeze
} = Object;
import {
    useEffect,
    useState
} from 'react';

function valueEnumerable(value) {
    return {
        enumerable: true,
        value
    };
}

function createCurrent(service) {
    return freeze(create(service.machine.state, {
        context: valueEnumerable(service.context || {}),
        service: valueEnumerable(service)
    }));
}

export function createUseMachine(useEffect, useState) {
    return function useMachine(providedMachine, initialContext) {
        let [machine, setMachine] = useState(providedMachine);
        let [service, setService] = useState(runInterpreter);

        let mounted = true;

        function runInterpreter(arg, data) {
            let m = arg || machine;
            return interpret(m, service => {
                if (!mounted) {
                    return;
                }
                setCurrent(createCurrent(service.child || service));
            }, data || initialContext);
        }

        let [current, setCurrent] = useState(createCurrent(service));

        useEffect(() => {
            if (machine !== providedMachine) {
                setMachine(providedMachine);

                let newService = runInterpreter(providedMachine, initialContext);
                setService(newService);
                setCurrent(createCurrent(newService));
            }

            return () => {
                mounted = false;
            }
        }, [providedMachine]);

        return [current, service.send, service];
    };
}

export const useMachine = createUseMachine(useEffect, useState);