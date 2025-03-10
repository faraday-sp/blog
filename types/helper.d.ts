declare type DeepKeys<T> =
  T extends Record<string, unknown>
    ? {
        [K in keyof T]: K | (T[K] extends Record<string, unknown> ? DeepKeys<T[K]> : never)
      }[keyof T]
    : never

declare type NestedPick<T, K extends DeepKeys<Extract<T, { status: 'success' }>>[]> =
  IsUnion<T> extends true
    ? K[0] extends keyof Extract<T, { status: 'success' }>
      ? Tail<K>[0] extends keyof NonNullable<Extract<T, { status: 'success' }>[K[0]]>
        ? NestedPick<NonNullable<Extract<T, { status: 'success' }>[K[0]]>, Tail<K>>
        : NonNullable<Extract<T, { status: 'success' }>[K[0]]>
      : Extract<T, { status: 'success' }>
    : K[0] extends keyof T
      ? Tail<K>[0] extends keyof NonNullable<T[K[0]]>
        ? NestedPick<NonNullable<T[K[0]]>, Tail<K>>
        : NonNullable<T[K[0]]>
      : T

declare type Tail<T extends unknown[]> = T extends [infer _, ...infer Rest] ? Rest : T
type IsUnion<T, U extends T = T> = (T extends unknown ? (U extends T ? false : true) : never) extends false
  ? false
  : true
