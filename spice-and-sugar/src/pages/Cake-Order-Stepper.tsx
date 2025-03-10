import CakeOrderStepper from "../components/CakeOrderStepper";

const Stepper = ({ userName }: { userName: string }) => {
  return <CakeOrderStepper userName={userName} />;
};

export default Stepper;