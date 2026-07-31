import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { projectTypes } from "@/lib/content";

const ORIGINAL_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
const ENDPOINT = "https://example.test/enquiries";

async function renderForm(endpoint: string | undefined) {
  vi.resetModules();
  if (endpoint === undefined) delete process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  else process.env.NEXT_PUBLIC_FORM_ENDPOINT = endpoint;
  const { default: QuoteForm } = await import("@/components/QuoteForm");
  return render(<QuoteForm />);
}

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada" } });
  fireEvent.change(screen.getByLabelText("Phone / WhatsApp"), {
    target: { value: "+60123456789" },
  });
}

function submit() {
  fireEvent.submit(screen.getByRole("button", { name: /send enquiry/i }).closest("form")!);
}

afterEach(() => {
  if (ORIGINAL_ENDPOINT === undefined) delete process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  else process.env.NEXT_PUBLIC_FORM_ENDPOINT = ORIGINAL_ENDPOINT;
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("QuoteForm without an endpoint configured", () => {
  it("renders a preview notice and every service as a project type", async () => {
    await renderForm(undefined);
    expect(screen.getByText(/set next_public_form_endpoint/i)).toBeInTheDocument();
    projectTypes.forEach((type) => {
      expect(screen.getByRole("option", { name: type })).toBeInTheDocument();
    });
    expect(screen.getByLabelText("Project Type")).toHaveValue(projectTypes[0]);
  });

  it("shows the preview confirmation and resets without any network call", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    await renderForm(undefined);
    fillRequiredFields();
    submit();

    expect(await screen.findByRole("status")).toHaveTextContent(/preview confirmation/i);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Name")).toHaveValue("");
  });
});

describe("QuoteForm with an endpoint configured", () => {
  it("posts the form data and confirms a real enquiry", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchSpy);
    await renderForm(ENDPOINT);
    fillRequiredFields();
    submit();

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledOnce());
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ Accept: "application/json" });
    expect((init.body as FormData).get("name")).toBe("Ada");

    expect(await screen.findByRole("status")).toHaveTextContent(/we've received your enquiry/i);
    expect(screen.queryByText(/set next_public_form_endpoint/i)).not.toBeInTheDocument();
  });

  it("disables the button while sending", async () => {
    let resolveFetch: (value: { ok: boolean; status: number }) => void = () => {};
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise((resolve) => (resolveFetch = resolve))),
    );
    await renderForm(ENDPOINT);
    fillRequiredFields();
    submit();

    const button = screen.getByRole("button", { name: /sending/i });
    expect(button).toBeDisabled();

    resolveFetch({ ok: true, status: 200 });
    await screen.findByRole("status");
    expect(screen.getByRole("button", { name: /send enquiry/i })).toBeEnabled();
  });

  it("surfaces an error when the request fails with a non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    await renderForm(ENDPOINT);
    fillRequiredFields();
    submit();

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
    expect(screen.getByLabelText("Name")).toHaveValue("Ada");
  });

  it("surfaces an error when the request rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    await renderForm(ENDPOINT);
    fillRequiredFields();
    submit();

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });
});
