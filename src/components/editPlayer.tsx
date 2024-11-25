// components/EditPlayerModal.tsx
import { useForm } from "react-hook-form";
import { Modal } from "./ui/modal";
import { Button } from "@/components/ui/button";

interface PlayerData {
  id: string;
  name: string;
  position: string;
  number: number;
  stats: {
    goals: number;
    assists: number;
  };
  imageUrl: string;
}

interface EditPlayerModalProps {
  player: PlayerData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PlayerData) => void;
}

export function EditPlayerModal({
  player,
  isOpen,
  onClose,
  onSave,
}: EditPlayerModalProps) {
  const { register, handleSubmit} = useForm<PlayerData>({
    defaultValues: player || {
      id: "",
      name: "",
      position: "",
      number: 0,
      stats: {
        goals: 0,
        assists: 0,
      },
      imageUrl: "",
    },
  });

  const onSubmit = (data: PlayerData) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Name"
          className="input"
          defaultValue={player?.name || ""}
        />
        <input
          {...register("position")}
          placeholder="Position"
          className="input"
        />
        <input
          type="number"
          {...register("number")}
          placeholder="Number"
          className="input"
        />
        <input
          type="number"
          {...register("stats.goals")}
          placeholder="Goals"
          className="input"
        />
        <input
          type="number"
          {...register("stats.assists")}
          placeholder="Assists"
          className="input"
        />
        <input
          {...register("imageUrl")}
          placeholder="Image URL"
          className="input"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}
