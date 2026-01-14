/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import useModalChangePassword from './useModalChangePassword';
import { Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface PropTypes {
    isOpen: boolean;
    onOpenChange: () => any;
    onClose: () => void;
    refetchProfile: () => void;
}

const ModalChangePassword = (props: PropTypes) => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { isOpen, onOpenChange, onClose, refetchProfile } = props;
    
    const {
        control,
        handleSubmit,
        errors,
        isLoadingUpdatePassword,
        handleUpdatePassword,
        reset,
        trigger,
    } = useModalChangePassword({ onClose, refetchProfile });

    useEffect(() => {
        if (!isOpen) {
            reset();
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
    }, [isOpen, reset]);

    const handleClose = () => {
        reset();
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        onClose();
    };

    return (
        <Modal size='xl' isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose}>
            <ModalContent>
                {() => (
                    <form onSubmit={handleSubmit(handleUpdatePassword)}>
                        <ModalHeader>
                            <h2 className="text-xl font-bold">Change Password</h2>
                        </ModalHeader>

                        <ModalBody>
                            <div className='flex flex-col gap-4'>
                                <Controller
                                    name='new_password'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="New Password"
                                            labelPlacement="outside"
                                            placeholder="Enter new password"
                                            type={showNewPassword ? "text" : "password"}
                                            isRequired
                                            isInvalid={errors.new_password !== undefined}
                                            errorMessage={errors.new_password?.message}
                                            onBlur={() => {
                                                field.onBlur();
                                                trigger('new_password'); 
                                            }}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                if (e.target.value.length > 0) {
                                                    trigger('new_password');
                                                }
                                            }}
                                            endContent={
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="focus:outline-none"
                                                >
                                                    {showNewPassword ? (
                                                        <EyeOff className="w-5 h-5 text-primary" />
                                                    ) : (
                                                        <Eye className="w-5 h-5 text-primary" />
                                                    )}
                                                </button>
                                            }
                                            classNames={{
                                                inputWrapper: "border border-[#E4E4E4] bg-white",
                                                label: "text-gray-700 font-medium",
                                            }}
                                        />
                                    )}
                                />
                                
                                <Controller
                                    name="confirm_password"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Confirm Password"
                                            labelPlacement="outside"
                                            placeholder="Re-enter new password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            isRequired
                                            isInvalid={errors.confirm_password !== undefined}
                                            errorMessage={errors.confirm_password?.message}
                                            onBlur={() => {
                                                field.onBlur();
                                                trigger('confirm_password'); // Trigger validation on blur
                                            }}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                // Trigger validation after user starts typing
                                                if (e.target.value.length > 0) {
                                                    trigger('confirm_password');
                                                }
                                            }}
                                            endContent={
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmPassword(!showConfirmPassword)
                                                    }
                                                    className="focus:outline-none"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="w-5 h-5 text-primary" />
                                                    ) : (
                                                        <Eye className="w-5 h-5 text-primary" />
                                                    )}
                                                </button>
                                            }
                                            classNames={{
                                                inputWrapper: "border border-[#E4E4E4] bg-white",
                                                label: "text-gray-700 font-medium",
                                            }}
                                        />
                                    )}
                                />

                                {/* Password Requirements Info */}
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-600 font-medium mb-2">
                                        Password Requirements:
                                    </p>
                                    <ul className="text-xs text-gray-500 space-y-1">
                                        <li className={errors.new_password?.message?.includes('8 characters') ? 'text-red-500' : ''}>
                                            • Minimum 8 characters
                                        </li>
                                        <li className={errors.confirm_password?.message?.includes('match') ? 'text-red-500' : ''}>
                                            • Both passwords must match
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button 
                                className='bg-secondary text-primary' 
                                onPress={handleClose}
                                disabled={isLoadingUpdatePassword}
                            >
                                Close
                            </Button>
                            <Button 
                                type='submit' 
                                className='bg-primary text-secondary'
                                disabled={isLoadingUpdatePassword}
                            >
                                {isLoadingUpdatePassword ? (
                                    <Spinner color="white" size="sm" />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalChangePassword