import { Button, Grid } from "@mui/material"

interface Props {
  isDeleting: boolean
  onDeleteOrder: () => void
  allow: boolean
}
const DeleteOrder = ({ isDeleting, onDeleteOrder, allow }: Props) => {
  if (!allow) return <></>
  return (
    <Grid item md={12} xs={12}>
      <Button
        onClick={onDeleteOrder}
        disabled={isDeleting}
        sx={{
          border: "1px solid #DA1026",
          color: "#DA1026 ",
          "&:hover": {
            background: "rgb(255 100 123 / 10%)",
          },
        }}
      >
        {isDeleting ? "Загрузка..." : "Удалить"}
      </Button>
    </Grid>
  )
}

export default DeleteOrder
