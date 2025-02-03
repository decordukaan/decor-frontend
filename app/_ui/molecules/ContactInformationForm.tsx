import { useEffect, useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useForm } from "@mantine/form";
import { useDebounce } from "@/app/_hooks/useDebounce";

interface ContactInfo {
  userName: string;
  email: string;
  phone: string;
}

interface ContactInformationFormProps {
  contactInfo: ContactInfo;
  onChange: (info: ContactInfo) => void;
  onNext: (info: ContactInfo) => void;
  profile?: boolean;
}

const ContactInformationForm = ({ contactInfo, onChange, onNext, profile = false }: ContactInformationFormProps) => {
  const { user } = useUser();
  const [initialValues, setInitialValues] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: initialValues ?? { userName: "", email: "", phone: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) => /^(?:0*|\+91)?[6-9]\d{9}$/.test(value) ? null : "Invalid phone number",
    },
  });

  useEffect(() => {
    const fetchContactInformation = async () => {
      try {
        const email = user?.emailAddresses[0]?.emailAddress ?? contactInfo.email ?? "";
        if (!email) return;

        const response = await GlobalApi.getContactInformationByEmail(email);
        const existingContactInfo = response.data?.[0]?.attributes ?? {};

        setInitialValues({
          userName: existingContactInfo.userName ?? contactInfo.userName ?? "",
          email: existingContactInfo.email ?? email,
          phone: existingContactInfo.phone ?? contactInfo.phone ?? "",
        });
        form.setValues({
          userName: existingContactInfo.userName ?? contactInfo.userName ?? "",
          email: existingContactInfo.email ?? email,
          phone: existingContactInfo.phone ?? contactInfo.phone ?? "",
        });
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
      setLoading(false);
    };

    fetchContactInformation();
  }, [user, contactInfo]);

  const updateContactInfo = useDebounce(async (values: ContactInfo) => {
    try {
      await GlobalApi.updateContactInformationByEmail(values.email, values);
      console.log("Contact information updated/created successfully");
    } catch (error) {
      console.error("Error updating/creating contact information:", error);
    }
  }, 500);

  useEffect(() => {
    if (!loading && form.values.email) {
      updateContactInfo(form.values);
    }
  }, [form.values, loading]);

  const handleSubmit = async (values: ContactInfo) => {
    const processedContactInfo: ContactInfo = {
      ...values,
      phone: values.phone.replace(/^0*|\+91/, ""),
    };

    try {
      await GlobalApi.updateContactInformationByEmail(values.email, processedContactInfo);
      if (profile) {
        // If it's a profile update, we might want to show a success message or update local state
        console.log("Profile updated successfully");
      } else {
        onNext(processedContactInfo);
      }
    } catch (error) {
      console.error("Error updating/creating contact information:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4 mt-6">
      <TextInput
        label="Full Name"
        placeholder="Enter your full name"
        required
        {...form.getInputProps("userName")}
      />
      <TextInput
        label="Email"
        placeholder="Enter your email"
        required
        {...form.getInputProps("email")}
      />
      <TextInput
        label="Phone Number"
        placeholder="Enter your phone number"
        required
        {...form.getInputProps("phone")}
      />
       <Button fullWidth type="submit" color="yellow" mt={38}>
        {profile ? "Save" : "Next"}
      </Button>
    </form>
  );
};

export default ContactInformationForm;
