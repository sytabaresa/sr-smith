import { Atom, atom, getDefaultStore } from 'jotai'
import type { Getter } from 'jotai'
import { interpret, Machine, Service, SendEvent } from 'robot3'

export const atomWithMachine = (
    getMachine: Machine | ((get: Getter) => Machine),
    getInitialContext?: any | ((get: Getter) => any)
) => {

    const cacheCallbackAtom = atom(null)
    const cacheServiceAtom = atom<Service<Machine> | null>(null)
    const serviceAtom = atom(
        (get) => {
            const cachedService = get(cacheServiceAtom)

            if (cachedService) {
                return { service: cachedService }
            }

            let initializing = true
            const safeGet: typeof get = (...args) => {
                if (initializing) {
                    return get(...args)
                }
                throw new Error('get not allowed after initialization')
            }
            const machine = isGetter(getMachine) ? getMachine(safeGet) : getMachine
            const initialContext = isGetter(getInitialContext) ? getInitialContext(safeGet) : getInitialContext
            initializing = false

            const service = interpret(machine, (service) => get(cacheCallbackAtom)(service), initialContext)

            return { service }
        },
        (get, set) => {
            set(cacheServiceAtom, get(serviceAtom).service)
        })

    //for init value in cache
    serviceAtom.onMount = (commit) => {
        commit()
    }

    const cachedMachineAtom = atom<{ name: string, context: any } | null>(null)
    const machineAtom = atom(
        (get) => {
            const { service } = get(serviceAtom)
            // console.log(service)
            return get(cachedMachineAtom) ?? {
                name: service.machine.current,
                context: service.context,
            }
        },
        (get, set) => {
            // const { service } = get(serviceAtom)

            set(cacheCallbackAtom, () => (service) => {
                // console.log(service)
                set(cachedMachineAtom, {
                    name: service.machine.current,
                    context: service.context,
                    // service,
                })

            })
        })

    machineAtom.onMount = (commit) => {
        commit()
    }

    const finalMachineAtom = atom(
        (get) => get(machineAtom),
        (get, set, event: SendEvent) => {
            const { service } = get(serviceAtom)
            const getMachine = (a) => ([get(a), (s) => set(a, s)])
            service.context['getMachine'] = getMachine
            service.send(event)
        }
    )

    return finalMachineAtom
}

const isGetter = <T>(v: T | ((get: Getter) => T)): v is (get: Getter) => T =>
    typeof v === 'function'