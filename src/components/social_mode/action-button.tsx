import { Button } from "antd";

const ActionButton = ({ icon, aria }: { icon: React.ReactNode; aria: string }) => (
    <Button
        type="text"
        className="text-white hover:text-pink-500 text-2xl p-0"
        aria-label={aria}
        icon={icon}
    />
);

export default ActionButton;