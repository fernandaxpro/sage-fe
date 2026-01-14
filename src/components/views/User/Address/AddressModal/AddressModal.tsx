/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox, Select, SelectItem } from "@heroui/react";
import useAddressModal from "./useAddressModal";
import { Controller } from "react-hook-form";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
    type: 'billing' | 'shipping';
    refetchProfile: () => void;
}

const AddressModal = ({ isOpen, onClose, mode, initialData, type, refetchProfile }: AddressModalProps) => {
    const {
        control,
        handleSubmit,
        errors,
        handleUpdateAddress,
        isLoadingUpdateProfile,
        setValue,
        getValues,
        watch,
        reset,
    } = useAddressModal({ type, refetchProfile, initialData })

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(handleUpdateAddress)}>
                        <ModalHeader>
                            <h1 className="text-xl font-bold">
                                {mode === "add" ? `${type === 'shipping' ? "Add Shipping Address" : "Add Billing Address"}` : `${type === 'shipping' ? "Edit Shipping Address" : "Edt Billing Address"}`}
                            </h1>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4 items-center">
                                    <Controller
                                        name="person"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Contact Person"
                                                labelPlacement="outside"
                                                placeholder="Enter person name"
                                                isRequired
                                                isInvalid={errors.person !== undefined}
                                                errorMessage={errors.person?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="company"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Company Name"
                                                labelPlacement="outside"
                                                placeholder="Enter company name"
                                                isRequired
                                                isInvalid={errors.company !== undefined}
                                                errorMessage={errors.company?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Address"
                                            labelPlacement="outside"
                                            placeholder="Enter street address"
                                            isRequired
                                            isInvalid={errors.address !== undefined}
                                            errorMessage={errors.address?.message}
                                        />
                                    )}
                                />
                                <div className="flex gap-4 items-center">
                                    <Controller
                                        name="country_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isRequired
                                                label="Country"
                                                labelPlacement="outside"
                                                placeholder="Select country"
                                                isInvalid={errors.country_id !== undefined}
                                                errorMessage={errors.country_id?.message}
                                            >
                                                <SelectItem key="satu">Country 1</SelectItem>
                                                <SelectItem key="dua">Country 2</SelectItem>
                                            </Select>
                                        )}
                                    />
                                    <Controller
                                        name="state_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isRequired
                                                label="State"
                                                labelPlacement="outside"
                                                placeholder="Select state"
                                                isInvalid={errors.state_id !== undefined}
                                                errorMessage={errors.state_id?.message}
                                            >
                                                <SelectItem key="satu">State 1</SelectItem>
                                                <SelectItem key="dua">State 2</SelectItem>
                                            </Select>
                                        )}
                                    />
                                    <Controller
                                        name="city_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isRequired
                                                label="City"
                                                labelPlacement="outside"
                                                placeholder="Select city"
                                                isInvalid={errors.city_id !== undefined}
                                                errorMessage={errors.city_id?.message}
                                            >
                                                <SelectItem key="satu">City 1</SelectItem>
                                                <SelectItem key="dua">City 2</SelectItem>
                                            </Select>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-4 items-center">
                                    <Controller
                                        name="suburb"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Suburb"
                                                labelPlacement="outside"
                                                placeholder="Enter suburb"
                                                isRequired
                                                isInvalid={errors.suburb !== undefined}
                                                errorMessage={errors.suburb?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="post_code"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Postcode"
                                                labelPlacement="outside"
                                                placeholder="Enter postal code"
                                                isRequired
                                                isInvalid={errors.post_code !== undefined}
                                                errorMessage={errors.post_code?.message}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="bg-secondary text-primary px-8 font-medium w-full sm:w-auto"
                                radius="full"
                                onPress={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-primary text-secondary px-8 font-medium w-full sm:w-auto"
                                radius="full"
                                type="submit"
                            >
                                {mode === "add" ? "Submit" : "Save"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddressModal;
