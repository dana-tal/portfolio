import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

function useMaxChars() {
  const [maxChars, setMaxChars] = useState(600);

  useEffect(() => {
    const update = () => {
      setMaxChars(window.innerWidth < 600 ? 350 : 600);
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return maxChars;
}

export default function ReadMoreText({ text }) {
  const [expanded, setExpanded] = useState(false);
  const maxChars = useMaxChars();

  const isLong = text?.length > maxChars;

  const displayedText =
    !expanded && isLong ? text.slice(0, maxChars) + "..." : text;

  return (
    <Box>
      <Typography
        sx={{
          whiteSpace: "pre-line",
          lineHeight: 1.8,
          fontSize: { xs: "0.95rem", md: "1rem" }
        }}
      >
        {displayedText}
      </Typography>

      {isLong && (
        <Button
          onClick={() => setExpanded((prev) => !prev)}
          sx={{
            mt: 1,
            textTransform: "none",
            fontSize: { xs: "0.85rem", md: "0.9rem" }
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </Button>
      )}
    </Box>
  );
}