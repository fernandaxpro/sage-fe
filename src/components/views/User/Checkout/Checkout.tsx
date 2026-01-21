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

                    <div className='flex flex-col md:flex-row gap-4 items-start'>
                        <div className='flex-1 md:basis-[60%] rounded-lg border border-bordered p-8 flex-col'>
                            <h1 className='text-primary font-semibold text-base mb-[30px]'>
                                Billing Details
                            </h1>

                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col lg:flex-row gap-4'>
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
                                                classNames={{
                                                    label: "!text-primary",
                                                    input: "!text-primary"
                                                }}
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
                                                classNames={{
                                                    label: "!text-primary",
                                                    input: "!text-primary"
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='flex flex-col lg:flex-row gap-4'>
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
                                                classNames={{
                                                    label: "!text-primary",
                                                    input: "!text-primary"
                                                }}
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
                                                classNames={{
                                                    label: "!text-primary",
                                                    input: "!text-primary"
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
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
                                                inputProps={{
                                                    classNames: {
                                                        label: "!text-primary",
                                                        input: "!text-primary"
                                                    }
                                                }}
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
                                                inputProps={{
                                                    classNames: {
                                                        label: "!text-primary",
                                                        input: "!text-primary"
                                                    }
                                                }}
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
                                                inputProps={{
                                                    classNames: {
                                                        label: "!text-primary",
                                                        input: "!text-primary"
                                                    }
                                                }}
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
                                                classNames={{
                                                    label: "!text-primary",
                                                    input: "!text-primary"
                                                }}
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
                                            classNames={{
                                                label: "text-primary"
                                            }}
                                        >
                                            Ship to a different address
                                        </Checkbox>
                                    )}
                                />

                                <div className='flex flex-col lg:flex-row gap-4'>
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
                                                classNames={{
                                                    label: "!text-primary",
                                                    input: "!text-primary"
                                                }}
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
                                                classNames={{
                                                    label: "!text-primary",
                                                    input: "!text-primary"
                                                }}
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
                                            classNames={{
                                                label: "!text-primary",
                                                input: "!text-primary"
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className='flex-1 md:basis-[40%] rounded-lg border border-bordered p-8 flex-col'>
                            <h1 className='text-primary font-semibold text-base mb-[30px]'>
                                Your Order
                            </h1>

                            <div className='flex flex-col gap-6'>
                                {/* Product List */}
                                <div className='flex flex-col gap-4'>
                                    <div className='flex justify-between items-start pb-4 border-b border-bordered'>
                                        <div className='flex-1'>
                                            <p className='text-sm font-medium text-gray-400 mb-1'>Product</p>
                                        </div>
                                        <div>
                                            <p className='text-sm font-medium text-gray-400'>Subtotal</p>
                                        </div>
                                    </div>

                                    {/* Product Items */}
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex justify-between items-start gap-4'>
                                            <div className='flex-1'>
                                                <p className='text-sm font-medium text-primary mb-1'>
                                                    Shelly BUTTON 1 - Black SH-SHELLYBUT8
                                                </p>
                                                <p className='text-xs text-gray-400'>x1 item</p>
                                            </div>
                                            <div>
                                                <p className='text-sm font-medium text-primary'>$45.27</p>
                                            </div>
                                        </div>

                                        <div className='flex justify-between items-start gap-4'>
                                            <div className='flex-1'>
                                                <p className='text-sm font-medium text-primary mb-1'>
                                                    HLook 4 MP Network IR Turret Camera 2.8mm IPC-T240H
                                                </p>
                                                <p className='text-xs text-gray-400'>x1 item</p>
                                            </div>
                                            <div>
                                                <p className='text-sm font-medium text-primary'>$70.49</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className='flex justify-between items-center pt-4 border-t border-bordered'>
                                        <p className='text-sm font-medium text-primary'>Subtotal</p>
                                        <p className='text-sm font-semibold text-primary'>$115.76</p>
                                    </div>
                                </div>

                                {/* Shipping Method */}
                                <div className='flex flex-col gap-3 pt-4'>
                                    <p className='text-sm font-medium text-gray-400 mb-2'>Shipping Method</p>

                                    <label className='flex items-center justify-between cursor-pointer'>
                                        <div className='flex items-center gap-3'>
                                            <input
                                                type="radio"
                                                name="shipping"
                                                className='w-4 h-4 accent-primary'
                                                defaultChecked
                                            />
                                            <span className='text-sm text-primary'>Express Shipping</span>
                                        </div>
                                        <span className='text-sm font-medium text-primary'>$25.00</span>
                                    </label>

                                    <label className='flex items-center justify-between cursor-pointer'>
                                        <div className='flex items-center gap-3'>
                                            <input
                                                type="radio"
                                                name="shipping"
                                                className='w-4 h-4 accent-primary'
                                            />
                                            <span className='text-sm text-primary'>Regular Shipping</span>
                                        </div>
                                        <span className='text-sm font-medium text-primary'>$10.00</span>
                                    </label>
                                </div>

                                {/* Payment Method */}
                                <div className='flex flex-col gap-3 pt-4'>
                                    <p className='text-sm font-medium text-gray-400 mb-2'>Payment Method</p>

                                    <label className='flex items-start gap-3 cursor-pointer'>
                                        <input
                                            type="radio"
                                            name="payment"
                                            className='w-4 h-4 mt-1 accent-primary'
                                            defaultChecked
                                        />
                                        <div className='flex flex-col'>
                                            <span className='text-sm font-medium text-primary'>Paypal Payment</span>
                                            <span className='text-xs text-gray-400'>Pay with Paypal now</span>
                                        </div>
                                    </label>

                                    <label className='flex items-start gap-3 cursor-pointer'>
                                        <input
                                            type="radio"
                                            name="payment"
                                            className='w-4 h-4 mt-1 accent-primary'
                                        />
                                        <div className='flex flex-col'>
                                            <span className='text-sm font-medium text-primary'>Master Card / VISA</span>
                                            <span className='text-xs text-gray-400'>Pay with Credit Card now</span>
                                        </div>
                                    </label>

                                    <label className='flex items-start gap-3 cursor-pointer'>
                                        <input
                                            type="radio"
                                            name="payment"
                                            className='w-4 h-4 mt-1 accent-primary'
                                        />
                                        <div className='flex flex-col'>
                                            <span className='text-sm font-medium text-primary'>Bank Transfer</span>
                                            <span className='text-xs text-gray-400 leading-relaxed'>
                                                When you continue with this payment you will be provided with bank account details to submit payment. Your order will not be processed until payment is received.
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                {/* Total */}
                                <div className='flex justify-between items-center pt-6 border-t border-bordered'>
                                    <p className='text-base font-semibold text-primary'>Total</p>
                                    <p className='text-xl font-bold text-primary'>$140.76</p>
                                </div>

                                {/* Terms & Conditions */}
                                <label className='flex items-start gap-3 cursor-pointer pt-4'>
                                    <input
                                        type="checkbox"
                                        className='w-4 h-4 mt-1 accent-primary'
                                    />
                                    <span className='text-sm text-primary'>
                                        I agree to the <span className='font-medium'>Terms & Conditions</span>
                                    </span>
                                </label>

                                {/* Payment Button */}
                                <button className='w-full bg-primary text-white py-3 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors mt-2'>
                                    Payment Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default Checkout