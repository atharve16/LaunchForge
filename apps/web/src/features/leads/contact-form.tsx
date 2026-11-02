'use client';

import { useState } from 'react';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import type { CreateLeadRequest, LeadResponse } from '@launchforge/shared';
import { Button } from '@/components/ui/button';
import { services } from '@/config/content';
import { apiRequest } from '@/services/api/client';
import { endpoints } from '@/services/api/endpoints';

export function ContactForm() {
  const [token, setToken] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  function armForm() {
    if (!token) setToken(`${Date.now()}.${crypto.randomUUID()}`);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setMessage('');
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: CreateLeadRequest = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      companyName: String(data.get('companyName') || '') || undefined,
      startupStage: String(data.get('startupStage')) as CreateLeadRequest['startupStage'],
      servicesNeeded: data.getAll('servicesNeeded').map(String),
      budgetRange: String(data.get('budgetRange')) as CreateLeadRequest['budgetRange'],
      projectDescription: String(data.get('projectDescription') || ''),
      website: String(data.get('website') || ''),
      submissionToken: token,
    };
    if (!payload.servicesNeeded.length) {
      setState('error');
      setMessage('Select at least one service.');
      return;
    }
    try {
      await apiRequest<LeadResponse>(endpoints.leads, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setState('success');
      form.reset();
    } catch (error) {
      setState('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'We could not submit your request. Please try again.',
      );
      setToken(`${Date.now()}.${crypto.randomUUID()}`);
    }
  }

  if (state === 'success')
    return (
      <div className="border-success/20 bg-success/5 rounded-3xl border p-8" role="status">
        <CheckCircle2 className="text-success size-8" />
        <h2 className="font-heading mt-5 text-2xl font-semibold">
          Your request is safely in the queue.
        </h2>
        <p className="text-ink-secondary mt-3 leading-7">
          Thank you. The team can review the context you shared and respond using your email
          address. A response-time promise will be published once operations confirm it.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setState('idle');
            setToken(`${Date.now()}.${crypto.randomUUID()}`);
          }}
        >
          Send another request
        </Button>
      </div>
    );

  const inputClass =
    'mt-2 min-h-12 w-full rounded-xl border border-line bg-surface px-4 outline-none transition focus:border-accent';
  return (
    <form
      onSubmit={submit}
      onFocus={armForm}
      onPointerEnter={armForm}
      className="space-y-6"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Name *</span>
          <input
            name="name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email *</span>
          <input
            name="email"
            type="email"
            required
            maxLength={320}
            autoComplete="email"
            className={inputClass}
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Startup / company name</span>
          <input
            name="companyName"
            maxLength={160}
            autoComplete="organization"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Startup stage *</span>
          <select name="startupStage" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a stage
            </option>
            <option value="IDEA">Idea</option>
            <option value="PROTOTYPE">Prototype</option>
            <option value="MVP">MVP</option>
            <option value="SCALING">Scaling</option>
          </select>
        </label>
      </div>
      <fieldset>
        <legend className="text-sm font-medium">Services required *</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {services.map((service) => (
            <label
              key={service.slug}
              className="border-line bg-surface text-ink-secondary has-checked:border-accent has-checked:bg-surface-alt has-checked:text-ink flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition"
            >
              <input
                type="checkbox"
                name="servicesNeeded"
                value={service.slug}
                className="accent-accent size-4"
              />
              {service.name}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="text-sm font-medium">Budget range *</span>
        <select name="budgetRange" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select a range
          </option>
          <option value="UNDER_5_LAKH">Under ₹5 lakh</option>
          <option value="FIVE_TO_FIFTEEN_LAKH">₹5–15 lakh</option>
          <option value="FIFTEEN_TO_FIFTY_LAKH">₹15–50 lakh</option>
          <option value="ABOVE_FIFTY_LAKH">Above ₹50 lakh</option>
          <option value="NOT_SURE">Not sure yet</option>
        </select>
        <span className="text-muted mt-1 block text-xs">
          Used only to recommend a realistic scope; it is not a published price.
        </span>
      </label>
      <label className="block">
        <span className="text-sm font-medium">Project description *</span>
        <textarea
          name="projectDescription"
          required
          minLength={30}
          maxLength={5000}
          rows={7}
          className={`${inputClass} py-3`}
          placeholder="What are you trying to build, for whom, and where are you currently stuck?"
        />
      </label>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {state === 'error' ? (
        <p
          className="border-danger/20 bg-danger/5 text-danger rounded-xl border px-4 py-3 text-sm"
          role="alert"
        >
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={state === 'submitting' || !token}
        className="w-full sm:w-auto"
      >
        {state === 'submitting' ? <LoaderCircle className="size-4 animate-spin" /> : null}Submit
        discovery request
      </Button>
      <p className="text-muted text-xs leading-5">
        By submitting, you ask LaunchForge to use these details to respond to your enquiry. Review
        the privacy notice before sending sensitive information.
      </p>
    </form>
  );
}
