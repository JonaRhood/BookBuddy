import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import SearchBooks from "../src/app/components/SearchBooks"

describe("SearchBooks Component tests", () => {
  beforeEach(() => {
    jest.resetAllMocks()

    global.IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    global.fetch = jest.fn()
  })

  it("Renders input and select with initial values", () => {
    render(<SearchBooks />)
    expect(screen.getByTestId("input-search")).toBeInTheDocument()
    expect(screen.getByTestId("select-search")).toHaveValue("author")
  })

  it("Changes search type from author to title", () => {
    render(<SearchBooks />)
    const select = screen.getByTestId("select-search")
    fireEvent.change(select, { target: { value: "title" } })
    expect(select).toHaveValue("title")
  })

  it("Shows error message if submitting empty input", async () => {
    render(<SearchBooks />)
    fireEvent.submit(screen.getByTestId("form-search"))

    await waitFor(() => {
      expect(screen.getByTestId("error-search")).toBeInTheDocument()
    })
  })

  it("Displays an error message when no results are found", async () => {
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<SearchBooks />)
    fireEvent.change(screen.getByTestId("input-search"), { target: { value: "nothing" } })
    fireEvent.submit(screen.getByTestId("form-search"))

    await waitFor(() => {
      expect(screen.getByTestId("error-search")).toBeInTheDocument()
    })
  })

  it("Calls fetch and updates books on valid search", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ docs: [{ cover_i: 123, title: "Test Book" }] }),
    })

    render(<SearchBooks />)
    fireEvent.change(screen.getByTestId("input-search"), { target: { value: "test" } })
    fireEvent.submit(screen.getByTestId("form-search"))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })

    expect(screen.queryByText(/Please enter a search term./)).not.toBeInTheDocument()
  })
})
