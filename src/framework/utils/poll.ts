type TimerId = ReturnType<typeof setInterval>

type MaybePromise<A> = Promise<A> | A

export function poll<A, B>(options: {
  target: () => MaybePromise<A>
  check: (
    result: A
  ) => MaybePromise<{ done: false; data?: undefined } | { done: true; data: B }>
  then: (data: B) => MaybePromise<void>
  interval: number
}): { stop: () => void } {
  const { target, check, then, interval } = options

  let polling: TimerId | null = null

  const stop = () => polling && clearInterval(polling)

  polling = setInterval(async () => {
    const result = await target()
    const { done, data } = await check(result)
    if (done) {
      await then(data)
      stop()
    }
  }, interval)

  return { stop }
}
