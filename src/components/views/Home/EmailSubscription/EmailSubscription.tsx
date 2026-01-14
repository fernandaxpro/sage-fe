import Container from "@/components/ui/Container";
import { Button, Input } from "@heroui/react";

const EmailSubscription = () => {
  return (
    <Container className="justify-center align-middle p-0 py-12 md:py-[100px] px-4 md:px-8">
      <div className="flex flex-col gap-8 md:gap-[60px]">
        <div className="flex flex-col gap-4 md:gap-[22px] justify-center align-middle">
          <h1 className="text-center font-bold text-2xl md:text-4xl lg:text-[50px] text-primary">
            Subscribe to Our Newsletter
          </h1>
          <p className="text-primary text-base md:text-xl lg:text-[30px] text-center font-medium px-4">
            Join our newsletter and get <br className="hidden md:inline" /> $20 discount for your first order
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-[16px] justify-center items-center w-full max-w-2xl mx-auto">
          <Input
            placeholder="Enter your email address"
            type="email"
            className="w-full"
            classNames={{
              input: "h-[52px] w-full rounded-full",
              inputWrapper: "h-[52px] w-full md:w-[517px] rounded-full"
            }}
          />
          <Button
            className="bg-primary text-base md:text-[18px] font-semibold text-white h-[52px] w-full md:w-[140px] md:min-w-[140px] rounded-full"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default EmailSubscription;
