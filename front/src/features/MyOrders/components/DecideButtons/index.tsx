import { Grid, Stack, Button } from "@mui/material"
import React from "react"

interface Props {
  modal: {
    handle: boolean
    deny: boolean
  }
  setModal: (
    value: React.SetStateAction<{
      handle: boolean
      deny: boolean
    }>
  ) => void
  allow: boolean
}
const DecideButtons = ({ modal, setModal, allow }: Props) => {
  if (!allow) return <></>
  return (
    <Grid item md={6} xs={12}>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => setModal({ ...modal, handle: true })}
          sx={{
            border: "1px solid #64ffda",
            color: "#64ffda",
            "&:hover": {
              background: "rgb(100 255 218 / 10%)",
            },
          }}
        >
          Обработать заказ
        </Button>
        <Button
          onClick={() => setModal({ ...modal, deny: true })}
          sx={{
            border: "1px solid #DA1026 ",
            color: "#DA1026 ",
            "&:hover": {
              background: "rgb(255 100 123 / 10%)",
            },
          }}
        >
          Отказать в заказе
        </Button>
      </Stack>
    </Grid>
  )
}

export default DecideButtons
