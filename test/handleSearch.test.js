// helpers.test.ts
import { renderCover } from "@/app/utils/utils"

describe("renderCover() Function Unit Test", () => {
  test("returns 'cover_id' for 'home' type", () => {
    const post = { cover_id: 123 }
    expect(renderCover(post, "home")).toBe("/api/cover/123")
  })

  test("returns 'cover_i' for 'author' type", () => {
    const post = { cover_i: 456 }
    expect(renderCover(post, "author")).toBe("/api/cover/456")
  })

  test("returns 'covers' for 'saved' type", () => {
    const post = { covers: [789] }
    expect(renderCover(post, "saved")).toBe("/api/cover/789")
  })

  test("returns placeholder when no cover is found", () => {
    const post = {}
    expect(renderCover(post, "unknown")).toBe("./image-error.svg")
  })
})
