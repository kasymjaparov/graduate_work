import { Link, Paper } from "@mui/material"
import { FC } from "react"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { tokensDark } from "@/app/providers/ThemeProvider"
interface IDeniedEmptyPaper {
  title: string
  createLink?: string
  createText?: string
}
const EmptyListPaper: FC<IDeniedEmptyPaper> = ({
  title,
  createLink = "",
  createText = "Создать запись",
}) => {
  const navigate = useNavigate()
  const onClickEvent = () => {
    navigate(0)
  }
  return (
    <Paper
      className="emptyList"
      sx={{
        width: "50%",
        minHeight: "150px",
        background: tokensDark.primary[500],
        "@media(max-width:768px)": { width: "100%" },
        paddingY: "20px",
      }}
    >
      <div>
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 70 }} />
      </div>
      <div className="emptyListTitle">{title}</div>
      {createLink ? (
        <NavLink style={{ paddingTop: "20px" }} to={createLink}>
          <Link
            underline="none"
            sx={{
              cursor: "pointer",

              fontSize: "16px",
              textAlign: "right",
              "@media(max-width:768px)": {
                fontSize: "11px",
              },
            }}
          >
            {createText}
          </Link>
        </NavLink>
      ) : null}
      <Link
        underline="none"
        sx={{
          cursor: "pointer",
          mt: "10px",
          fontSize: "13px",
          color: tokensDark.primary[100],
          textAlign: "right",
          "@media(max-width:768px)": {
            fontSize: "11px",
          },
        }}
        onClick={onClickEvent}
      >
        Перезагрузить страницу
      </Link>
    </Paper>
  )
}

export default EmptyListPaper
