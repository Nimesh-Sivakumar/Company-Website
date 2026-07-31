"use client";

import { useState } from "react";
import { buttonClass } from "./Button";
import { fieldLabelClass } from "./Section";
import { projectTypes } from "@/lib/content";

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!endpoint) {
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-2 w-full border border-ink/15 bg-white-warm px-4 py-3 text-sm outline-none transition-colors focus:border-tan-deep";

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={fieldLabelClass}>
          Name
        </label>
        <input id="name" name="name" type="text" required placeholder="Your name" className={field} />
      </div>
      <div>
        <label htmlFor="phone" className={fieldLabelClass}>
          Phone / WhatsApp
        </label>
        <input id="phone" name="phone" type="tel" required placeholder="+60" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="email" className={fieldLabelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" placeholder="you@example.com" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="projectType" className={fieldLabelClass}>
          Project Type
        </label>
        <select id="projectType" name="projectType" className={field} defaultValue={projectTypes[0]}>
          {projectTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={fieldLabelClass}>
          A little about the space
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Rough size, location, timeline..."
          className={field}
        />
      </div>

      {!endpoint && (
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-dim sm:col-span-2">
          Set NEXT_PUBLIC_FORM_ENDPOINT to receive real enquiries by email.
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className={`inline-flex ${buttonClass()} disabled:opacity-60`}
        >
          {status === "sending" ? "Sending…" : "Send Enquiry"}
        </button>
      </div>

      {status === "sent" && (
        <p role="status" className="border border-tan-deep/30 bg-coffee-soft px-4 py-3 text-sm sm:col-span-2">
          {endpoint
            ? "Thanks — we've received your enquiry and will follow up to arrange a site visit."
            : "Thanks — this is a preview confirmation. Connect a form endpoint to receive real enquiries."}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2">
          Something went wrong sending your enquiry. Please message us on Instagram instead.
        </p>
      )}
    </form>
  );
}
