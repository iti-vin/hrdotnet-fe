import { Group, Stack } from "@mantine/core";
import { AutoComplete } from "@shared/ui/select-fields/auto-complete";
import { MultiSelect } from "@shared/ui/input-fields/multi-select";
import NumberInput from "@shared/ui/input-fields/number-input";
import PasswordInput from "@shared/ui/input-fields/pasword-input";
import { Select } from "@shared/ui/input-fields/select";
import TextArea from "@shared/ui/input-fields/text-area";
import TextInput from "@shared/ui/input-fields/text-input";
import { useState } from "react";

const CompileInputs = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [textArea, setTextArea] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [selectField, setSelectField] = useState("");
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [autoCompleteField, setAutoComplete] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-6 bg-yellow-50 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-6xl h-full p-10 overflow-auto">
        <Stack>
          {/* Text Input */}
          <Group justify="center" grow>
            <TextInput
              label="Username"
              type="text"
              name="username"
              id="username"
              disabled={false}
              autoComplete="off"
              placeholder="Enter your username"
              required={false}
              errorMessage="Username is required"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              showError={formSubmitted}
            />
            <TextInput
              label="Username"
              type="text"
              name="username"
              id="username"
              disabled={false}
              autoComplete="off"
              placeholder="Enter your username"
              required={true}
              errorMessage="Username is required"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              showError={formSubmitted}
            />
            <TextInput
              label="Username"
              type="text"
              name="username"
              id="username"
              disabled={true}
              autoComplete="off"
              placeholder="Enter your username"
              required={true}
              errorMessage="Username is required"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              showError={formSubmitted}
            />
          </Group>

          {/* Number Input */}
          <Group justify="center" grow>
            <NumberInput
              label="Number Input"
              name="numberinput"
              id="numberinput"
              autoComplete="on"
              placeholder="Enter number input"
              value={numberInput}
              required={false}
              disabled={false}
              errorMessage="required Field"
              onChange={(e) => setNumberInput(e.target.value)}
              showError={formSubmitted}
            />
            <NumberInput
              label="Number Input"
              name="numberinput"
              id="numberinput"
              autoComplete="on"
              placeholder="Enter number input"
              value={numberInput}
              required={true}
              disabled={false}
              errorMessage="required Field"
              onChange={(e) => setNumberInput(e.target.value)}
              showError={formSubmitted}
            />
            <NumberInput
              label="Number Input"
              name="numberinput"
              id="numberinput"
              autoComplete="on"
              placeholder="Enter number input"
              value={numberInput}
              required={true}
              disabled={true}
              errorMessage="required Field"
              onChange={(e) => setNumberInput(e.target.value)}
              showError={formSubmitted}
            />
          </Group>

          {/* Text Area */}
          <Group justify="center" grow>
            <TextArea
              label="Text Area"
              name="textarea"
              id="textarea"
              value={textArea}
              autoComplete="off"
              rows={3}
              placeholder="enter brief description"
              required={false}
              disabled={false}
              errorMessage="required field"
              onChange={(e) => setTextArea(e.target.value)}
              showError={formSubmitted}
            />
            <TextArea
              label="Text Area"
              name="textarea"
              id="textarea"
              value={textArea}
              autoComplete="off"
              rows={3}
              placeholder="enter brief description"
              required={true}
              disabled={false}
              errorMessage="required field"
              onChange={(e) => setTextArea(e.target.value)}
              showError={formSubmitted}
            />
            <TextArea
              label="Text Area"
              name="textarea"
              id="textarea"
              value={textArea}
              autoComplete="off"
              rows={3}
              placeholder="enter brief description"
              required={true}
              disabled={true}
              errorMessage="required field"
              onChange={(e) => setTextArea(e.target.value)}
              showError={formSubmitted}
            />
          </Group>

          {/* Email Input */}
          {/* <Group justify="center" grow>
            <EmailInput
              label="Email"
              name="email"
              id="marlyn"
              value={email}
              placeholder="Enter your email"
              autoComplete="off"
              required={false}
              disabled={false}
              showError={formSubmitted}
              errorMessage="email is required"
              onChange={(e) => setEmail(e.target.value)}
            />
            <EmailInput
              label="Email"
              name="email"
              id="marlyn"
              value={email}
              placeholder="Enter your email"
              autoComplete="off"
              required={true}
              disabled={false}
              showError={formSubmitted}
              errorMessage="email is required"
              onChange={(e) => setEmail(e.target.value)}
            />
            <EmailInput
              label="Email"
              name="email"
              id="marlyn"
              value={email}
              placeholder="Enter your email"
              autoComplete="off"
              required={true}
              disabled={true}
              showError={formSubmitted}
              errorMessage="email is required"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Group> */}

          {/* Password Input */}
          <Group justify="center" grow>
            <PasswordInput
              label="Password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              autoComplete="off"
              required={false}
              disabled={false}
              showError={formSubmitted}
              errorMessage="Password is required"
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              label="Password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              autoComplete="off"
              required={true}
              disabled={false}
              showError={formSubmitted}
              errorMessage="Password is required"
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              label="Password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              autoComplete="off"
              required={true}
              disabled={true}
              showError={formSubmitted}
              errorMessage="Password is required"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Group>

          {/* Select Input */}
          <Group justify="center" grow>
            <Select
              id="schedule"
              name="schedule"
              label="Request Schedule"
              value={selectField}
              required={false}
              disabled={false}
              showError={formSubmitted}
              errorMessage="Please select a schedule."
              onChange={(e) => setSelectField(e.target.value)}
              options={[
                { label: "Same Day", value: "same-day" },
                { label: "Next Day", value: "next-day" },
                { label: "Custom", value: "custom" },
              ]}
            />
            <Select
              id="schedule"
              name="schedule"
              label="Request Schedule"
              value={selectField}
              required={true}
              disabled={false}
              showError={formSubmitted}
              errorMessage="Please select a schedule."
              onChange={(e) => setSelectField(e.target.value)}
              options={[
                { label: "Same Day", value: "same-day" },
                { label: "Next Day", value: "next-day" },
                { label: "Custom", value: "custom" },
              ]}
            />
            <Select
              id="schedule"
              name="schedule"
              label="Request Schedule"
              value={selectField}
              required={true}
              disabled={true}
              showError={formSubmitted}
              errorMessage="Please select a schedule."
              onChange={(e) => setSelectField(e.target.value)}
              options={[
                { label: "Same Day", value: "same-day" },
                { label: "Next Day", value: "next-day" },
                { label: "Custom", value: "custom" },
              ]}
            />
          </Group>

          {/* Auto Complete */}

          <Group justify="center" grow>
            <AutoComplete
              id="fruit"
              name="fruit"
              label="Favorite Fruit"
              placeholder="Type to search"
              value={autoCompleteField}
              required={false}
              disabled={false}
              showError={formSubmitted}
              errorMessage="Please select a fruit"
              onChange={(e) => setAutoComplete(e.target.value)}
              options={[
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
                { label: "Mango", value: "mango" },
                { label: "Pineapple", value: "pineapple" },
              ]}
            />
            <AutoComplete
              id="fruit"
              name="fruit"
              label="Favorite Fruit"
              placeholder="Type to search"
              value={autoCompleteField}
              required={true}
              disabled={false}
              showError={formSubmitted}
              errorMessage="Please select a fruit"
              onChange={(e) => setAutoComplete(e.target.value)}
              options={[
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
                { label: "Mango", value: "mango" },
                { label: "Pineapple", value: "pineapple" },
              ]}
            />
            <AutoComplete
              id="fruit"
              name="fruit"
              label="Favorite Fruit"
              placeholder="Type to search"
              value={autoCompleteField}
              required={true}
              disabled={true}
              showError={formSubmitted}
              errorMessage="Please select a fruit"
              onChange={(e) => setAutoComplete(e.target.value)}
              options={[
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
                { label: "Mango", value: "mango" },
                { label: "Pineapple", value: "pineapple" },
              ]}
            />
          </Group>

          {/* Multi Select */}
          <Group justify="center" grow>
            <MultiSelect
              id="schedule"
              name="schedule"
              label="Request Schedule"
              value={selectedSchedules}
              required={false}
              disabled={false}
              showError={formSubmitted}
              errorMessage="Schedule is required"
              options={[
                { label: "SAME DAY1", value: "same-day1" },
                { label: "NEXT DAY2", value: "next-day2" },
                { label: "SAME DAY3", value: "same-day3" },
                { label: "NEXT DAY4", value: "next-da4y" },
                { label: "SAME DAY5", value: "same-day5" },
                { label: "NEXT DAY6", value: "next-d6ay" },
              ]}
              onChange={(e) => setSelectedSchedules(e)}
            />
            <MultiSelect
              id="schedule"
              name="schedule"
              label="Request Schedule"
              value={selectedSchedules}
              required={true}
              disabled={false}
              showError={formSubmitted}
              errorMessage="Schedule is required"
              options={[
                { label: "SAME DAY1", value: "same-day1" },
                { label: "NEXT DAY2", value: "next-day2" },
                { label: "SAME DAY3", value: "same-day3" },
                { label: "NEXT DAY4", value: "next-da4y" },
                { label: "SAME DAY5", value: "same-day5" },
                { label: "NEXT DAY6", value: "next-d6ay" },
              ]}
              onChange={(e) => setSelectedSchedules(e)}
            />
            <MultiSelect
              id="schedule"
              name="schedule"
              label="Request Schedule"
              value={selectedSchedules}
              required={true}
              disabled={true}
              showError={formSubmitted}
              errorMessage="Schedule is required"
              options={[
                { label: "SAME DAY1", value: "same-day1" },
                { label: "NEXT DAY2", value: "next-day2" },
                { label: "SAME DAY3", value: "same-day3" },
                { label: "NEXT DAY4", value: "next-da4y" },
                { label: "SAME DAY5", value: "same-day5" },
                { label: "NEXT DAY6", value: "next-d6ay" },
              ]}
              onChange={(e) => setSelectedSchedules(e)}
            />
          </Group>
        </Stack>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompileInputs;
