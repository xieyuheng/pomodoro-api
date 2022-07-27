export type Json = string | number | boolean | null | Array<Json> | JsonObject

export type JsonObject = { [x: string]: Json }

export type LeafJson = string | number | boolean | null | Array<Json>

export function flattenJson(json: JsonObject): Record<string, LeafJson> {
  const record = {}
  flattenJsonCollect(json, "$", record)
  return record
}

function isLeafJson(json: Json): json is LeafJson {
  return typeof json !== "object" || json instanceof Array
}

function flattenJsonCollect(
  json: { [x: string]: Json },
  path: string = "$",
  record: Record<string, LeafJson>
): void {
  for (const [key, value] of Object.entries(json)) {
    const next = `${path}.${key}`
    if (isLeafJson(value)) {
      record[next] = value
    } else {
      flattenJsonCollect(value, next, record)
    }
  }
}
