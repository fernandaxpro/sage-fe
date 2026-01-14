/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Autocomplete, AutocompleteItem, Spinner } from "@heroui/react";
import useAddressModal from "./useAddressModal";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>
    setType: React.Dispatch<React.SetStateAction<string>>
    initialData?: any;
    setInitial: React.Dispatch<React.SetStateAction<any>>
    type: string;
    refetchProfile: () => void;
}

const AddressModal = ({ isOpen, onClose, mode, initialData, type, refetchProfile, setMode, setType, setInitial }: AddressModalProps) => {
    const {
        control,
        handleSubmit,
        errors,
        handleUpdateAddress,
        watchCountry,
        watchState,
        reset,
        isLoadingUpdateProfile,
        defaultValues,
    } = useAddressModal({ type, refetchProfile, initialData, onClose, setMode, setType, mode })

    const [countriesList, setCountriesList] = useState<any[]>([]);
    const [statesList, setStatesList] = useState<any[]>([]);
    const [citiesList, setCitiesList] = useState<any[]>([]);

    useEffect(() => {
        GetCountries().then((result: any) => {
            setCountriesList(result);
        });
    }, []);

    useEffect(() => {
        if (watchCountry) {
            GetState(Number(watchCountry)).then((result: any) => {
                setStatesList(result);
            });
        } else {
            setStatesList([]);
            setCitiesList([]);
        }
    }, [watchCountry]);

    useEffect(() => {
        if (watchCountry && watchState) {
            GetCity(Number(watchCountry), Number(watchState)).then((result: any) => {
                setCitiesList(result);
            });
        } else {
            setCitiesList([]);
        }
    }, [watchCountry, watchState]);

    const handleClose = () => {
        reset(defaultValues);
        onClose();
        setMode("")
        setType("")
        setInitial(null)
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="2xl"
        >
            <ModalContent>
                {() => (
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
                                            <Autocomplete
                                                isRequired
                                                label="Country"
                                                labelPlacement="outside"
                                                placeholder="Search or select country"
                                                isInvalid={errors.country_id !== undefined}
                                                errorMessage={errors.country_id?.message}
                                                selectedKey={field.value ? String(field.value) : null}
                                                onSelectionChange={(key) => {
                                                    field.onChange(key ? String(key) : "");
                                                }}
                                                onClear={() => {
                                                    field.onChange("");
                                                }}
                                                isClearable
                                                allowsCustomValue={false}
                                            >
                                                {countriesList.map((country) => (
                                                    <AutocompleteItem key={String(country.id)}>
                                                        {country.name}
                                                    </AutocompleteItem>
                                                ))}
                                            </Autocomplete>
                                        )}
                                    />
                                    <Controller
                                        name="state_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                isRequired
                                                label="State"
                                                labelPlacement="outside"
                                                placeholder="Search or select state"
                                                isInvalid={errors.state_id !== undefined}
                                                errorMessage={errors.state_id?.message}
                                                isDisabled={!watchCountry || statesList.length === 0}
                                                selectedKey={field.value ? String(field.value) : null}
                                                onSelectionChange={(key) => {
                                                    field.onChange(key ? String(key) : "");
                                                }}
                                                onClear={() => {
                                                    field.onChange("");
                                                }}
                                                isClearable
                                                allowsCustomValue={false}
                                            >
                                                {statesList.map((state) => (
                                                    <AutocompleteItem key={String(state.id)}>
                                                        {state.name}
                                                    </AutocompleteItem>
                                                ))}
                                            </Autocomplete>
                                        )}
                                    />
                                    <Controller
                                        name="city_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                isRequired
                                                label="City"
                                                labelPlacement="outside"
                                                placeholder="Search or select city"
                                                isInvalid={errors.city_id !== undefined}
                                                errorMessage={errors.city_id?.message}
                                                isDisabled={!watchState || citiesList.length === 0}
                                                selectedKey={field.value ? String(field.value) : null}
                                                onSelectionChange={(key) => {
                                                    field.onChange(key ? String(key) : "");
                                                }}
                                                onClear={() => {
                                                    field.onChange("");
                                                }}
                                                isClearable
                                                allowsCustomValue={false}
                                            >
                                                {citiesList.map((city) => (
                                                    <AutocompleteItem key={String(city.id)}>
                                                        {city.name}
                                                    </AutocompleteItem>
                                                ))}
                                            </Autocomplete>
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
                                onPress={handleClose}
                                disabled={isLoadingUpdateProfile}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-primary text-secondary px-8 font-medium w-full sm:w-auto"
                                type="submit"
                            >
                                {isLoadingUpdateProfile ? (
                                    <Spinner color="white" size="sm" />
                                ) : ( mode === "add" ? "Submit" : "Save" )}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddressModal;
