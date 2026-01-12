import { AtSymbolIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Input,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import { useState } from "react";
import useModalAuth from "./useModalAuth";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerButton: React.ReactNode;
}

const ModalAuth = ({ isOpen, onOpenChange, triggerButton }: PropTypes) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useModalAuth()
  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="bottom-end"
      size="lg"
      className="w-[393px] rounded-[16px] shadow-lg shadow-gray-300/50"
    >

      <PopoverTrigger>{triggerButton}</PopoverTrigger>
      <PopoverContent className="w-full h-full">
        <div className="flex w-full p-5 flex-col gap-[22px]">
          <p className="text-2xl font-semibold">
            Sign In
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-[16px]">
              <Controller name='email' control={control} render={({ field }) => (
                <Input
                  {...field}
                  startContent={
                    <AtSymbolIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                  }
                  label={
                    <span className="text-base font-semibold">Email</span>
                  }
                  isRequired
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                  placeholder="e.g. email@example.com"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="full"
                  autoComplete="off"
                  className='text-base font-semibold'
                />
              )} />

              <Controller name='password' control={control} render={({ field }) => (
                <Input
                  {...field}
                  startContent={
                    <LockClosedIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                  }
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-solid outline-transparent"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                      ) : (
                        <EyeSlashIcon className="w-5 h-5 text-base text-legendary pointer-events-none" />
                      )}
                    </button>
                  }
                  isRequired
                  labelPlacement="outside"
                  label={
                    <span className="text-base font-semibold">Password</span>
                  }
                  placeholder="*****"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  radius="full"
                  autoComplete='off'
                  className='text-base font-semibold'
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                />
              )} />
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold">
                  <Link href="#" className="text-primary">
                    Forgot password?
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                className="bg-primary text-white text-base font-bold rounded-full px-[55px] py-[5px]"
                type='submit'
              >
                {isPendingLogin ? (
                  <Spinner color="white" size="sm" />
                ) : "Sign in"}
              </Button>
            </div>

            <p className="text-center text-base font-medium text-black">
              {"Don't have an account?"}&nbsp;
              <Link href="#" className="text-primary font-bold text-base">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ModalAuth;
