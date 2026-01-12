import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox, Select, SelectItem } from "@heroui/react";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
}

const AddressModal = ({ isOpen, onClose, mode, initialData }: AddressModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
            classNames={{
                header: "border-b border-[#E4E4E4]",
                footer: "flex justify-center pt-4",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold">
                                {mode === "add" ? "New Address" : "Edit Address"}
                            </h2>
                            <p className="text-sm font-normal text-gray-500">
                                {mode === "add"
                                    ? "Add a new delivery address for your orders."
                                    : "Update the details of your saved delivery address."}
                            </p>
                        </ModalHeader>
                        <ModalBody className="py-6">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <Input
                                        label="Address Label"
                                        placeholder="Enter address label (e.g. Home)"
                                        labelPlacement="outside"
                                        isRequired
                                        defaultValue={initialData?.label}
                                        classNames={{
                                            inputWrapper: "border border-[#E4E4E4] bg-white",
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Input
                                        label="Recipient Name"
                                        placeholder="Enter recipient name"
                                        labelPlacement="outside"
                                        isRequired
                                        className="flex-1"
                                        defaultValue={initialData?.recipientName}
                                        classNames={{
                                            inputWrapper: "border border-[#E4E4E4] bg-white",
                                        }}
                                    />
                                    <Input
                                        label="Phone Number"
                                        placeholder="Enter phone number"
                                        labelPlacement="outside"
                                        isRequired
                                        className="flex-1"
                                        defaultValue={initialData?.phoneNumber}
                                        classNames={{
                                            inputWrapper: "border border-[#E4E4E4] bg-white",
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Input
                                        label="Address Line 1"
                                        placeholder="Enter address"
                                        labelPlacement="outside"
                                        isRequired
                                        className="flex-1"
                                        defaultValue={initialData?.addressLine1}
                                        classNames={{
                                            inputWrapper: "border border-[#E4E4E4] bg-white",
                                        }}
                                    />
                                    <Input
                                        label="Address Line 2"
                                        placeholder="Enter address (optional)"
                                        labelPlacement="outside"
                                        className="flex-1"
                                        defaultValue={initialData?.addressLine2}
                                        classNames={{
                                            inputWrapper: "border border-[#E4E4E4] bg-white",
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                    <Select
                                        label="City"
                                        placeholder="Select city"
                                        labelPlacement="outside"
                                        isRequired
                                        defaultSelectedKeys={initialData?.city ? [initialData.city] : []}
                                        classNames={{
                                            trigger: "border border-[#E4E4E4] bg-white",
                                        }}
                                    >
                                        <SelectItem key="Brisbane">Brisbane</SelectItem>
                                        <SelectItem key="Sydney">Sydney</SelectItem>
                                        <SelectItem key="Melbourne">Melbourne</SelectItem>
                                    </Select>

                                    <Input
                                        label="Postcode / ZIP"
                                        placeholder="Enter postcode"
                                        labelPlacement="outside"
                                        isRequired
                                        defaultValue={initialData?.postcode}
                                        classNames={{
                                            inputWrapper: "border border-[#E4E4E4] bg-white",
                                        }}
                                    />

                                    <Select
                                        label="Country"
                                        placeholder="Select country"
                                        labelPlacement="outside"
                                        isRequired
                                        defaultSelectedKeys={initialData?.country ? [initialData.country] : []}
                                        classNames={{
                                            trigger: "border border-[#E4E4E4] bg-white",
                                        }}
                                    >
                                        <SelectItem key="Australia">Australia</SelectItem>
                                    </Select>

                                    <Select
                                        label="State / Province"
                                        placeholder="Select state"
                                        labelPlacement="outside"
                                        isRequired
                                        defaultSelectedKeys={initialData?.state ? [initialData.state] : []}
                                        classNames={{
                                            trigger: "border border-[#E4E4E4] bg-white",
                                        }}
                                    >
                                        <SelectItem key="QLD">QLD</SelectItem>
                                        <SelectItem key="NSW">NSW</SelectItem>
                                        <SelectItem key="VIC">VIC</SelectItem>
                                    </Select>
                                </div>

                                <Checkbox defaultSelected={initialData?.isDefault}>
                                    Set as default address
                                </Checkbox>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="bg-[#0F2A4A] text-white px-8 font-medium w-full sm:w-auto"
                                radius="full"
                                onPress={onClose}
                            >
                                {mode === "add" ? "Submit Address" : "Save Changes"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddressModal;
