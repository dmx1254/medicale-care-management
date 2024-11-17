"use client";
import { useMemo, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";

import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import {
  format,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  isSameDay,
  parse,
} from "date-fns";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { LucideIcon } from "lucide-react";

interface DateProps {
  schedule: string;
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  description?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  timeCaption?: string;
  IconAbsView?: LucideIcon;
  IconAbsOff?: LucideIcon;
  minDate?: Date | undefined;
  type?: string;
  inactivesDates?: DateProps[];
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

interface CustomHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  type?: string;
}

const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  type = "default",
}: CustomHeaderProps) => {
  if (type === "appointment") {
    const currentMonth = new Date().getMonth();
    const remainingMonths = 12 - currentMonth;

    return (
      <div className="w-full flex items-center justify-center">
        <div className="flex space-x-2">
          <select
            value={format(date, "M")}
            onChange={({ target: { value } }) =>
              changeMonth(parseInt(value) - 1)
            }
            className="px-2 py-2 text-base bg-white dark:bg-dark-400 border dark:border-dark-500 rounded-md"
          >
            {Array.from({ length: remainingMonths }, (_, i) => {
              const monthIndex = currentMonth + i;
              return (
                <option key={monthIndex} value={monthIndex + 1}>
                  {format(new Date(2024, monthIndex, 1), "MMMM", {
                    locale: fr,
                  })}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }

  if (type === "birthdate") {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    const yearRange = currentYear - startYear;

    return (
      <div className="w-full flex items-center justify-center p-4">
        <div className="flex space-x-2">
          <select
            value={format(date, "yyyy")}
            onChange={({ target: { value } }) => changeYear(Number(value))}
            className="px-2 py-2 text-base bg-white dark:bg-dark-400 border dark:border-dark-500 rounded-md"
          >
            {Array.from({ length: yearRange }, (_, i) => (
              <option key={i} value={startYear + i}>
                {startYear + i}
              </option>
            ))}
          </select>
          <select
            value={format(date, "M")}
            onChange={({ target: { value } }) =>
              changeMonth(parseInt(value) - 1)
            }
            className="px-4 py-2 text-lg bg-white dark:bg-dark-400 border dark:border-dark-500 rounded-md"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {format(new Date(2021, i, 1), "MMMM", { locale: fr })}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return null;
};

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    placeholder,
    iconSrc,
    iconAlt,
    showTimeSelect,
    dateFormat,
    IconAbsView,
    IconAbsOff,
    renderSkeleton,
    timeCaption,
    type,
    inactivesDates,
  } = props;

  const filterTime = (time: Date) => {
    const hour = time.getHours();
    const minute = time.getMinutes();

    // Autoriser les heures entre 8h00 et 20h30
    if (hour < 8) return false; // Avant 8h
    if (hour > 20) return false; // Après 20h
    if (hour === 20 && minute > 30) return false; // Après 20h30

    return true;
  };

  const getExcludedTimesForDate = (
    inactivesDates: { schedule: string }[] | undefined, // Assurez-vous que l'argument accepte `undefined`
    selectedDate: Date
  ) => {
    // Si inactivesDates est undefined, on retourne un tableau vide
    if (!inactivesDates) return [];

    return inactivesDates
      .filter((date) => {
        // Convertir le champ 'schedule' en objet Date en utilisant le format ISO
        const inactiveDate = parseISO(date.schedule); // Utilisation de `parseISO` pour parser la date ISO
        // Vérifier si le jour correspond à la date sélectionnée
        return isSameDay(inactiveDate, selectedDate);
      })
      .map((date) => {
        // Extraire la partie "HH:mm:ss" depuis la chaîne ISO
        const time = date.schedule.split("T")[1].split(".")[0]; // "HH:mm:ss"
        const [hour, minute] = time.split(":");
        // Créer une Date avec uniquement les heures et minutes
        return setHours(
          setMinutes(setSeconds(new Date(), 0), Number(minute)),
          Number(hour)
        );
      });
  };

  const selectedDate = field.value || new Date();
  // console.log(timeFiltered);

  // Appeler la fonction avec la valeur `inactivesDates`, qui peut être undefined
  const excludedTimes = getExcludedTimesForDate(inactivesDates, selectedDate);

  const [isView, setIsView] = useState<boolean>(false);

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="w-full relative flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              type={
                props.name === "password" || props.name === "confirmPassword"
                  ? isView
                    ? "text"
                    : "password"
                  : "text"
              }
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
          <button
            className="outline-none border-none absolute left-[92%] top-[22%] text-[#CDE9DF]"
            onClick={() => setIsView((prevView) => !prevView)}
            type="button"
          >
            {isView
              ? IconAbsView && <IconAbsView size={22} />
              : IconAbsOff && <IconAbsOff size={22} />}
          </button>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="SN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="w-full flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <div className="large-datepicker-wrapper">
              <DatePicker
                selected={field.value || new Date()}
                onChange={(date) => field.onChange(date)}
                dateFormat={dateFormat ?? "dd-MM-yyyy"}
                showTimeSelect={showTimeSelect ?? false}
                timeInputLabel="Heure:"
                wrapperClassName="date-picker"
                excludeTimes={excludedTimes}
                locale={fr}
                timeIntervals={30}
                filterTime={filterTime}
                timeCaption={timeCaption || ""}
                renderCustomHeader={(props) => (
                  <CustomHeader {...props} type={type} />
                )}
                showYearDropdown
                className="w-full border-0 bg-transparent px-2 py-1 outline-none"
                yearDropdownItemNumber={40}
                scrollableYearDropdown
              />
            </div>
          </FormControl>
        </div>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content overflow-y-auto">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="rounded"
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } =
    props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error"></FormMessage>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
