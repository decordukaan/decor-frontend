import { useEffect, useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useForm } from "@mantine/form";
import { useDebounce } from "@/app/_hooks/useDebounce";

interface ShippingDetailsFormProps {
  shippingDetails: {
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    email: string;
  };
  onNext: (processedShippingDetails: ShippingDetailsFormProps['shippingDetails']) => void;
  onChange: (info: ShippingDetailsFormProps['shippingDetails']) => void;
  profile?: boolean;
}

const ShippingDetailsForm = ({ shippingDetails, onNext, profile = false }: ShippingDetailsFormProps) => {
  const { user } = useUser();
  const [initialValues, setInitialValues] = useState<ShippingDetailsFormProps['shippingDetails'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModified, setIsModified] = useState(false);

  const form = useForm({
    initialValues: initialValues ?? {
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      email: user?.emailAddresses[0]?.emailAddress ?? shippingDetails.email ?? "",
    },
    validate: {
      address_line1: (value) => (value ? null : "Address is required"),
      city: (value) => (value ? null : "City is required"),
      state: (value) => (value ? null : "State is required"),
      postal_code: (value) => (/^\d{6}$/.test(value) ? null : "Invalid postal code"),
      country: (value) => (value ? null : "Country is required"),
    },
  });

  useEffect(() => {
    const fetchShippingDetails = async () => {
      try {
        const email = user?.emailAddresses[0]?.emailAddress ?? shippingDetails.email ?? "";
        if (!email) {
          setInitialValues(shippingDetails);
          setLoading(false);
          return;
        }

        const response = await GlobalApi.getShippingDetailsByEmail(email);
        const existingShippingDetails = response.data?.[0]?.attributes ?? {};

        const newValues = {
          address_line1: existingShippingDetails.address_line1 ?? shippingDetails.address_line1 ?? "",
          address_line2: existingShippingDetails.address_line2 ?? shippingDetails.address_line2 ?? "",
          city: existingShippingDetails.city ?? shippingDetails.city ?? "",
          state: existingShippingDetails.state ?? shippingDetails.state ?? "",
          postal_code: existingShippingDetails.postal_code ?? shippingDetails.postal_code ?? "",
          country: existingShippingDetails.country ?? shippingDetails.country ?? "",
          email: email,
        };

        setInitialValues(newValues);
        form.setValues(newValues);
      } catch (error) {
        console.error("Error fetching shipping details:", error);
      }
      setLoading(false);
    };

    fetchShippingDetails();
  }, [user, shippingDetails]);

  useEffect(() => {
    if (initialValues) {
      setIsModified(JSON.stringify(form.values) !== JSON.stringify(initialValues));
    }
  }, [form.values, initialValues]);

  const updateShippingDetails = useDebounce(async (values: ShippingDetailsFormProps['shippingDetails']) => {
    try {
      const email = user?.emailAddresses[0]?.emailAddress || "";
      if (email) {
        await GlobalApi.updateOrCreateShippingDetailsByEmail(email, values);
        console.log("Shipping details updated/created successfully");
      }
    } catch (error) {
      console.error("Error updating/creating shipping details:", error);
    }
  }, 500);

  useEffect(() => {
    if (!loading && form.values.address_line1) {
      updateShippingDetails(form.values);
    }
  }, [form.values, loading]);

  const handleSubmit = async (values: ShippingDetailsFormProps['shippingDetails']) => {
    try {
      const email = user?.emailAddresses[0]?.emailAddress || "";
      await GlobalApi.updateOrCreateShippingDetailsByEmail(email, values);
      onNext(values);
      setIsModified(false); // Reset modification state after successful save
    } catch (error) {
      console.error("Error updating/creating shipping details:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4 mt-6">
      <TextInput
        label="Address Line 1"
        placeholder="Enter your address"
        required
        {...form.getInputProps("address_line1")}
      />
      <TextInput
        label="Address Line 2"
        placeholder="Enter your address"
        {...form.getInputProps("address_line2")}
      />
      <TextInput
        label="City"
        placeholder="Enter your city"
        required
        {...form.getInputProps("city")}
      />
      <TextInput
        label="State"
        placeholder="Enter your state"
        required
        {...form.getInputProps("state")}
      />
      <TextInput
        label="Postal Code"
        placeholder="Enter your postal code"
        required
        {...form.getInputProps("postal_code")}
      />
      <TextInput
        label="Country"
        placeholder="Enter your country"
        required
        {...form.getInputProps("country")}
      />
      <Button fullWidth type="submit" color="yellow" mt={38} disabled={profile && !isModified}>
        {profile ? "Save" : "Next"}
      </Button>
    </form>
  );
};

export default ShippingDetailsForm;