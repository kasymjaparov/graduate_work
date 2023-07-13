import { LoaderDots } from "@/shared/ui"
import { Grid, FormControl, OutlinedInput, Button } from "@mui/material"

interface Props {
  value: string
  handleForm: (value: string) => void
  isLoading: boolean
  onClick: () => void
  allow: boolean
  text: string
  type?: "datetime-local" | "date"
}
const SetTime = ({
  value,
  handleForm,
  isLoading,
  onClick,
  allow,
  text,
  type = "datetime-local",
}: Props) => {
  if (!allow) return <></>
  return (
    <Grid item md={6} xs={12}>
      <FormControl sx={{ width: "100%" }}>
        <span className="myform__label">{text}</span>
        <OutlinedInput
          value={value}
          onChange={e => handleForm(e.target.value)}
          type={type}
          size="small"
          inputProps={{ min: new Date() }}
        />
        <Button
          disabled={isLoading}
          onClick={onClick}
          sx={{
            marginTop: "10px",
            border: "1px solid #64ffda",
            color: "#64ffda",
            "&:hover": {
              background: "rgb(100 255 218 / 10%)",
            },
          }}
        >
          {isLoading ? <LoaderDots /> : "Отправить"}
        </Button>
      </FormControl>
    </Grid>
  )
}

export default SetTime
