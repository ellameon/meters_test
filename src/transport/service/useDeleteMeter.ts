import { useMutation } from "react-query";
import { transport } from "../transport";


type Props = {
  onSuccess: () => void
}
export const useDeleteMeter = (
  {
    onSuccess
  }: Props) => {
  const mutate = useMutation("delete", {
    mutationFn: (id: string) => transport.delete(id),
    onSuccess
  })

  return {
    delete: mutate.mutate
  }
}