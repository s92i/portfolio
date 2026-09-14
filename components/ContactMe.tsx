import { useState } from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { PageInfo } from "../typings";

type Inputs = { name: string; email: string; subject: string; message: string };

export default function ContactMe({ pageInfo }: { pageInfo: PageInfo }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [status, setStatus] = useState("");
  const email = pageInfo.email?.trim();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!email) return;
    const body = `Hi, my name is ${data.name}.\n\n${data.message}\n\nReply to: ${data.email}`;
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with a draft. Send it there to complete your enquiry.");
  };
  const fields = [
    { name: "name", label: "Name", autoComplete: "name", maxLength: 100 },
    { name: "email", label: "Email", autoComplete: "email", maxLength: 254 },
    { name: "subject", label: "Subject", autoComplete: "off", maxLength: 200 },
    { name: "message", label: "Message", autoComplete: "off", maxLength: 2000 },
  ] as const;

  return (
    <div className="section-shell max-w-4xl">
      <h2 id="contact-title" className="text-3xl sm:text-4xl font-semibold text-center">
        I have got just what you need. <span className="decoration-[#F7AB0A]/50 underline">Let&apos;s talk.</span>
      </h2>
      <address className="grid gap-5 not-italic text-center">
        {pageInfo.phoneNumber && <div className="flex items-center gap-3 justify-center">
          <PhoneIcon aria-hidden="true" className="text-[#F7AB0A] h-6 w-6 shrink-0" />
          <a className="break-all" href={`tel:${pageInfo.phoneNumber.replace(/[^+\d]/g, "")}`}>{pageInfo.phoneNumber}</a>
        </div>}
        {email && <div className="flex items-center gap-3 justify-center">
          <EnvelopeIcon aria-hidden="true" className="text-[#F7AB0A] h-6 w-6 shrink-0" />
          <a className="break-all" href={`mailto:${encodeURIComponent(email)}`}>{email}</a>
        </div>}
        {pageInfo.address && <div className="flex items-center gap-3 justify-center">
          <MapPinIcon aria-hidden="true" className="text-[#F7AB0A] h-6 w-6 shrink-0" />
          <p>{pageInfo.address}</p>
        </div>}
      </address>
      {email && <form className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby="contact-help">
        <p id="contact-help" className="sm:col-span-2 text-sm text-gray-300">All fields are required. This form prepares a message in your email app.</p>
        {fields.map(field => {
          const inputProps = {
            id: `contact-${field.name}`,
            className: "contactInput",
            required: true,
            maxLength: field.maxLength,
            autoComplete: field.autoComplete,
            "aria-invalid": !!errors[field.name],
            "aria-describedby": errors[field.name] ? `${field.name}-error` : undefined,
            ...register(field.name, {
              required: `Enter your ${field.label.toLowerCase()}.`,
              validate: value => !!value.trim() || `Enter your ${field.label.toLowerCase()}.`,
              ...(field.name === "email" ? { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address." } } : {}),
            }),
          };
          return <div key={field.name} className={field.name === "subject" || field.name === "message" ? "sm:col-span-2" : ""}>
            <label className="form-label" htmlFor={inputProps.id}>{field.label}</label>
            {field.name === "message" ? <textarea {...inputProps} rows={5} /> : <input {...inputProps} type={field.name === "email" ? "email" : "text"} />}
            {errors[field.name] && <p id={`${field.name}-error`} className="form-error" role="alert">{errors[field.name]?.message}</p>}
          </div>;
        })}
        <button className="sm:col-span-2 bg-[#F7AB0A] py-4 px-6 rounded-md text-black font-bold text-lg" type="submit">Open email draft</button>
        <p role="status" className="sm:col-span-2 text-sm text-gray-300">{status}</p>
      </form>}
    </div>
  );
}
