// declare type ComponentInstance<T> = T extends new (...args: unknown[]) => infer R
//   ? R
//   : T extends (...args: never[]) => infer R
//     ? R extends { __ctx?: unknown }
//       ? Exclude<K, void> extends { expose: (...args: K) => void }
//         ? InstanceType<DefineComponent> & K[0]
//         : K
//       : unknown
//     : unknown
declare type ComponentInstance<T> = T extends new (...angs: unknown) => infer E
  ? E
  : T extends (_, _, expose: (exposed: infer E) => unknown) => unknown
    ? NonNullable<E>
    : unknown

declare type PropsCl = boolean | string | undefined

type DefineComponent = import('vue').DefineComponent
