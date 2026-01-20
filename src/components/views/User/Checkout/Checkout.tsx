/* eslint-disable @typescript-eslint/no-explicit-any */
import AppBreadcrumbs from '@/components/ui/AppBreadcrumbs'
import Container from '@/components/ui/Container'
import { Autocomplete, AutocompleteItem, Checkbox, Input, Textarea } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { CheckoutBreadcrumbs } from './Checkout.constant'
import { GetCity, GetCountries, GetState } from 'react-country-state-city'
import useCheckout from './useCheckout'
import { Controller } from 'react-hook-form'

const Checkout = () => {
    const {
        control,
        // handleSubmit,
        errors,
        // setValue,
        // getValues,
        // watch,
        // reset,
        watchCountry,
        watchState,
        // defaultValues
    } = useCheckout()

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

    return (
        <Container className="flex-col gap-8 py-8 px-4 sm:px-6 lg:px-8">
            <AppBreadcrumbs items={CheckoutBreadcrumbs} />

            <div className='flex flex-col md:flex-row gap-8'>
                <div className='flex flex-col gap-6'>
                    <h1 className='text-primary text-2xl font-semibold'>
                        Checkout
                    </h1>

                    <div className='flex flex-col gap-4'>
                        <div className='flex-1 md:basis-[60%] rounded-lg border border-bordered p-8 flex-col'>
                            <h1 className='text-primary font-semibold text-base mb-[30px]'>
                                Billing Details
                            </h1>

                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4'>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                radius='full'
                                                label="First Name"
                                                labelPlacement='outside'
                                                placeholder='Enter first name'
                                                isRequired
                                                type="text"
                                                className='flex-1'
                                                isInvalid={!!errors.firstName}
                                                errorMessage={errors.firstName?.message as string}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                radius='full'
                                                label="Last Name"
                                                labelPlacement='outside'
                                                placeholder='Enter last name'
                                                isRequired
                                                type="text"
                                                className='flex-1'
                                                isInvalid={!!errors.lastName}
                                                errorMessage={errors.lastName?.message as string}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='flex gap-4'>
                                    <Controller
                                        name="addressLine1"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                radius='full'
                                                label="Address Line 1"
                                                labelPlacement='outside'
                                                placeholder='Enter address'
                                                isRequired
                                                type="text"
                                                className='flex-1'
                                                isInvalid={!!errors.addressLine1}
                                                errorMessage={errors.addressLine1?.message as string}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="addressLine2"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                radius='full'
                                                label="Address Line 2"
                                                labelPlacement='outside'
                                                placeholder='Enter address (optional)'
                                                type="text"
                                                className='flex-1'
                                                isInvalid={!!errors.addressLine2}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                                    <Controller
                                        name="country_id"
                                        control={control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                isRequired
                                                radius='full'
                                                label="Country"
                                                labelPlacement="outside"
                                                placeholder="Search or select country"
                                                isInvalid={!!errors.country_id}
                                                errorMessage={errors.country_id?.message as string}
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
                                                {countriesList?.map((country) => (
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
                                                radius='full'
                                                label="State"
                                                labelPlacement="outside"
                                                placeholder="Search or select state"
                                                isInvalid={!!errors.state_id}
                                                errorMessage={errors.state_id?.message as string}
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
                                                radius='full'
                                                label="City"
                                                labelPlacement="outside"
                                                placeholder="Search or select city"
                                                isInvalid={!!errors.city_id}
                                                errorMessage={errors.city_id?.message as string}
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
                                    <Controller
                                        name="post_code"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                radius='full'
                                                label="Post Code"
                                                labelPlacement='outside'
                                                placeholder='Enter post code'
                                                isRequired
                                                type="text"
                                                isInvalid={!!errors.post_code}
                                                errorMessage={errors.post_code?.message as string}
                                            />
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="differentAddress"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            className='my-5'
                                            isSelected={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            Ship to a different address
                                        </Checkbox>
                                    )}
                                />

                                <div className='flex gap-4'>
                                    <Controller
                                        name="orderRef"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                radius='full'
                                                label="Order Ref"
                                                labelPlacement='outside'
                                                placeholder='Enter order reference'
                                                type="text"
                                                className='flex-1'
                                                isInvalid={!!errors.orderRef}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="poNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                radius='full'
                                                label="PO Number"
                                                labelPlacement='outside'
                                                placeholder='Enter PO number'
                                                type="text"
                                                className='flex-1'
                                                isInvalid={!!errors.poNumber}
                                            />
                                        )}
                                    />
                                </div>
                                <Controller
                                    name="orderNotes"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            radius='full'
                                            label="Order Notes"
                                            labelPlacement='outside'
                                            placeholder='Special note for delivery'
                                            type="text"
                                            className='flex-1'
                                            isInvalid={!!errors.orderNotes}
                                        // errorMessage={errors.lastName?.message}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Checkout