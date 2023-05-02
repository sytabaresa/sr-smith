import { Atom, WritableAtom, atom, getDefaultStore } from 'jotai'
import type { Getter } from 'jotai'
import { RESET } from 'jotai/utils';
import { interpret, Machine, Service, SendEvent, d } from 'robot3'

const { create, freeze } = Object

function valueEnumerable(value) {
    return { enumerable: true, value };
}

function createCurrent(service) {
    return freeze(create(service.machine.state, {
        context: valueEnumerable(service.context || {}),
        service: valueEnumerable(service)
    }));
}

export const atomWithMachine = (
    getMachine: Machine | ((get: Getter) => Machine),
    getInitialContext?: any | ((get: Getter) => any),
    getEvent?: any | ((get: Getter) => any),
) => {

    const cacheCallbackAtom = atom(null)
    const cacheServiceAtom = atom<Service<Machine> | null>(null)
    if (process.env.NODE_ENV !== 'production') {
        cacheServiceAtom.debugPrivate = true
    }
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
    if (process.env.NODE_ENV !== 'production') {
        cachedMachineAtom.debugPrivate = true
    }
    const machineAtom = atom(
        (get) => {
            const { service } = get(serviceAtom)
            // console.log(service)
            return get(cachedMachineAtom) ?? createCurrent(service)
        },
        (get, set) => {
            // const { service } = get(serviceAtom)


            set(cacheCallbackAtom, () => (service) => {
                // console.log(service)
                set(cachedMachineAtom, createCurrent(service))
            })
        })

    machineAtom.onMount = (commit) => {
        commit()
    }

    const finalMachineAtom = atom(
        (get) => get(machineAtom),
        (get, set, event: SendEvent | typeof RESET) => {
            const { service } = get(serviceAtom)

            // utils
            service.context['getter'] = get
            service.context['setter'] = (a) => (s) => set(a, s)
            const add = isGetter(getEvent) ? getEvent(get) : getEvent

            if (event === RESET) {
                set(cacheServiceAtom, null)
                set(serviceAtom)
            } else {
                typeof event == 'string' ?
                    service.send({ ...add, type: event, }) :
                    service.send({ ...add, ...event })
            }
        })

    return finalMachineAtom
}

const isGetter = <T>(v: T | ((get: Getter) => T)): v is (get: Getter) => T =>
    typeof v === 'function'


export interface JotaiContext<T = {}, A extends unknown[] = [], R = void> {
    getter: (a: Atom<T>) => T
    setter: (a: WritableAtom<T, A, R>) => (args: any) => R
}

export function atomWithToggle(
    initialValue?: boolean
): WritableAtom<boolean, boolean | undefined> {
    const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
        const update = nextValue ?? !get(anAtom)
        set(anAtom, update)
    })

    return anAtom as WritableAtom<boolean, boolean | undefined>
}

export const atomWithSomeMap = (initial = {}) => {
    const storeAtom = atom<Record<string, boolean>>(initial)
    const _someAtom = atom(
        (get) => {
            return Object.values(get(storeAtom)).some(a => !!a)
        },
        (get, set, value: Record<string, boolean>) => {
            set(storeAtom, { ...get(storeAtom), ...value })
        }
    )
    return _someAtom
}

export const atomCacheCancelable = <T>(getter: ((get: Getter) => T), initialValue: T = null) => {

    const cachedAtom = atom<T>(initialValue)
    const cancelableAtom = atom((get) => {
        const cachedValue = get(cachedAtom)
        if (cachedValue)
            return cachedValue

        return getter(get)
    },
        (get, set, cancel: typeof RESET) => {
            if (cancel == RESET)
                set(cachedAtom as any, null)
            set(cachedAtom as any, get(cancelableAtom))
        }
    )

    return cancelableAtom
}