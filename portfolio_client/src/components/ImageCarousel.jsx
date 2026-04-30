import { useState, useEffect, useRef } from "react";
import { Box, IconButton, Stack, Dialog } from "@mui/material";
import { ChevronLeft, ChevronRight, Close} from "@mui/icons-material";

export default function ImageCarousel({
  images = [],
  autoPlay = false,
  interval = 3000,
}) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, interval);
    }
    return () => resetTimeout();
  }, [current, autoPlay, interval]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

    const handleImageClick = (src) => {
    setSelectedImage(src);
    setOpen(true);
  };

  if (!images.length) return null;

  return (
    <>
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: 700,
        borderRadius: 2,
         px: { xs: 1, sm: 0 }, 
      }}
    >
      {/* Slides */}
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`slide-${index}`}
            onClick={() => handleImageClick(src)}
            sx={{
              width: "100%",
              flexShrink: 0,
              objectFit: "cover",
              height: { xs: 220, sm: 300, md: 400 },
              cursor: "zoom-in",
            }}
          />
        ))}
      </Box>

      {/* Left Arrow */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          bgcolor: "rgba(0,0,0,0.4)",
          color: "white",
          width: { xs: 32, sm: 40 },  
          height: { xs: 32, sm: 40 },
          "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
        }}
      >
        <ChevronLeft />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          bgcolor: "rgba(0,0,0,0.4)",
          color: "white",
          width: { xs: 32, sm: 40 },  
          height: { xs: 32, sm: 40 },
          "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
        }}
      >
        <ChevronRight />
      </IconButton>

      {/* Dots */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: current === index ? "white" : "grey.400",
              cursor: "pointer",
            }}
          />
        ))}
      </Stack>
    </Box>

     <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
      >
        <Box sx={{ position: "relative", bgcolor: "black" }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
              zIndex: 1,
            }}
          >
            <Close />
          </IconButton>

          <Box
            component="img"
            src={selectedImage}
            alt="large-view"
            sx={{
              width: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
        </Box>
      </Dialog>
    </>
  );
}