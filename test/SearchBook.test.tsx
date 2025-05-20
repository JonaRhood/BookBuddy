import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import SearchBooks from "../src/app/components/SearchBooks"

describe("SearchBooks.tsx Component tests", () => {
  beforeEach(() => {
    jest.resetAllMocks()
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
    expect(screen.getByTestId("input-search")).toBeInTheDocument()
  })

  it("Shows error message if submitting empty input", async () => {
    render(<SearchBooks />)
    const form = screen.getByTestId("form-search")

    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByTestId("error-search")).toBeInTheDocument()
    })
  })

  it("Displays an error message when no results are found.", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ docs: [] }),
    })

    render(<SearchBooks />)

    const input = screen.getByTestId("input-search")
    fireEvent.change(input, { target: { value: 'some search' } })

    const form = screen.getByTestId("form-search")
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByTestId("error-search")).toBeInTheDocument()
    })
  })

  it("Calls fetch and updates books on valid search", async () => {
    const fakeResponse = {
      docs: [
        { cover_i: 123, title: "Test Book" },
      ],
    }
      ; (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(fakeResponse),
      })

    render(<SearchBooks />)
    const input = screen.getByTestId("input-search")
    fireEvent.change(input, { target: { value: "test" } })

    fireEvent.submit(screen.getByTestId("form-search"))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })

    expect(screen.queryByText(/Please enter a search term./)).not.toBeInTheDocument()
  })
})
