import React, { useId } from "react";
import {
  Checkbox,
  RadioGroup,
  Slider,
  Toggle,
  ToggleGroup,
  Label,
} from "radix-ui";
import { Check } from "lucide-react";
import "../glass-ui.css";
import "./styles.css";

export function GlassCheckbox({
  label,
  checked,
  onCheckedChange,
  disabled,
  name,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  disabled?: boolean;
  name?: string;
}) {
  const id = useId();
  return (
    <div className="g-inline">
      <Checkbox.Root
        id={id}
        name={name}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        disabled={disabled}
        className="g-check glass-clear"
      >
        <Checkbox.Indicator>
          <Check size={14} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <Label.Root htmlFor={id}>{label}</Label.Root>
    </div>
  );
}

export function GlassRadioGroup({
  label,
  options,
  value,
  onValueChange,
  name,
}: {
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
}) {
  const id = useId();
  return (
    <RadioGroup.Root
      aria-label={label}
      name={name}
      value={value}
      onValueChange={onValueChange}
      className="g-stack"
    >
      {options.map((option, i) => (
        <div className="g-inline" key={option}>
          <RadioGroup.Item
            id={`${id}-${i}`}
            value={option}
            className="g-radio glass-clear"
          >
            <RadioGroup.Indicator className="g-radio-dot" />
          </RadioGroup.Item>
          <Label.Root htmlFor={`${id}-${i}`}>{option}</Label.Root>
        </div>
      ))}
    </RadioGroup.Root>
  );
}

export function GlassSlider({
  label,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}) {
  return (
    <div className="g-stack">
      <div className="g-between">
        <span>{label}</span>
        <output>{value}</output>
      </div>
      <Slider.Root
        aria-label={label}
        value={[value]}
        onValueChange={(v) => onValueChange(v[0])}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="g-slider"
      >
        <Slider.Track className="g-slider-track">
          <Slider.Range className="g-slider-range" />
        </Slider.Track>
        <Slider.Thumb className="g-slider-thumb" />
      </Slider.Root>
    </div>
  );
}

export function GlassToggle({
  label,
  pressed,
  onPressedChange,
  children,
}: {
  label: string;
  pressed: boolean;
  onPressedChange: (value: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <Toggle.Root
      aria-label={label}
      pressed={pressed}
      onPressedChange={onPressedChange}
      className="g-toggle glass-clear"
    >
      {children || label}
    </Toggle.Root>
  );
}
export function GlassToggleGroup({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <ToggleGroup.Root
      type="single"
      aria-label={label}
      value={value}
      onValueChange={(v) => {
        if (v) onValueChange(v);
      }}
      className="g-inline"
    >
      {options.map((option) => (
        <ToggleGroup.Item
          className="g-toggle glass-clear"
          value={option}
          key={option}
          aria-label={option}
        >
          {option}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
export function GlassLabel(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={`g-label ${props.className || ""}`} />;
}
export function GlassField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactElement<{
    id?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
  }>;
}) {
  const id = useId();
  return (
    <div className="g-stack">
      <GlassLabel htmlFor={id}>{label}</GlassLabel>
      {React.cloneElement(children, {
        id,
        "aria-describedby": hint || error ? `${id}-description` : undefined,
        "aria-invalid": !!error,
      })}
      {(hint || error) && (
        <p id={`${id}-description`} className={error ? "g-error" : "g-muted"}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
export function GlassInputGroup({
  prefix,
  suffix,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  return (
    <div className="g-input-group glass-clear">
      {prefix && <span>{prefix}</span>}
      <input {...props} />
      {suffix && <span>{suffix}</span>}
    </div>
  );
}
export function GlassInputOTP({
  label,
  value,
  onValueChange,
  length = 6,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  length?: number;
}) {
  return (
    <label className="g-stack">
      <span className="g-label">{label}</span>
      <input
        className="g-otp glass-clear"
        aria-label={label}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern={`[0-9]{${length}}`}
        maxLength={length}
        value={value}
        onChange={(event) =>
          onValueChange(event.target.value.replace(/\D/g, "").slice(0, length))
        }
        placeholder={"0".repeat(length)}
      />
      <span className="g-muted">
        {value.length}/{length} digits · paste supported
      </span>
    </label>
  );
}
export function GlassNativeSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return (
    <select
      {...props}
      className={`ui-field glass-deep ${props.className || ""}`}
    />
  );
}
export function GlassButtonGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div role="group" aria-label={label} className="g-button-group">
      {children}
    </div>
  );
}
