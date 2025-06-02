import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  Slider,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme,
  IconButton,
  Collapse,
} from "@mui/material";
import type { FilterSidebarProps } from "../../types/shopTypes";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceMinLimit,
  priceMaxLimit,
  brandOptions,
  colorOptions,
  sizeOptions,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceMinLimit,
    priceMaxLimit,
  ]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(!isMobile);
  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    setPriceRange([priceMinLimit, priceMaxLimit]);
  }, [priceMinLimit, priceMaxLimit]);

  useEffect(() => {
    const priceMinParam = searchParams.get("priceMin");
    const priceMaxParam = searchParams.get("priceMax");

    const min =
      priceMinParam && !isNaN(Number(priceMinParam))
        ? Number(priceMinParam)
        : priceMinLimit;
    const max =
      priceMaxParam && !isNaN(Number(priceMaxParam))
        ? Number(priceMaxParam)
        : priceMaxLimit;

    setPriceRange([min, max]);

    setSelectedBrands(searchParams.getAll("brand"));
    setSelectedColors(searchParams.getAll("color"));
    setSelectedSizes(searchParams.getAll("size"));
  }, [searchParams, priceMinLimit, priceMaxLimit]);

  const updateFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("priceMin");
    params.delete("priceMax");
    params.delete("brand");
    params.delete("color");
    params.delete("size");

    params.set("priceMin", priceRange[0].toString());
    params.set("priceMax", priceRange[1].toString());

    selectedBrands.forEach((b) => params.append("brand", b));
    selectedColors.forEach((c) => params.append("color", c));
    selectedSizes.forEach((s) => params.append("size", s));

    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const toggleValue = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      setPriceRange([newValue[0], newValue[1]]);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#333333" }}>
        Filters
      </Typography>
      {isMobile && (
        <IconButton onClick={toggleVisibility} size="medium">
          {isOpen ? <BiChevronUp /> : <BiChevronDown />}
        </IconButton>
      )}
      <Collapse in={isOpen}>
        <div style={{ marginBottom: 24 }}>
          <Typography gutterBottom sx={{ color: "#666666" }}>
            Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={priceMinLimit}
            max={priceMaxLimit}
            disableSwap
            sx={{
              color: "#8b4513",
              "& .MuiSlider-thumb": {
                borderColor: "#8b4513",
              },
              "& .MuiSlider-rail": {
                opacity: 0.5,
                backgroundColor: "#f5f5f5",
              },
            }}
          />
          <div>
            <span>Min: {priceRange[0]}</span> -{" "}
            <span>Max: {priceRange[1]}</span>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Brand</Typography>
          {brandOptions.map(({ key, label }) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={selectedBrands.includes(key)}
                  onChange={() => toggleValue(key, setSelectedBrands)}
                  sx={{
                    color: "#8b4513",
                    "&.Mui-checked": {
                      color: "#8b4513",
                    },
                  }}
                />
              }
              label={label}
            />
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Color</Typography>
          {colorOptions.map(({ key, label }) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={selectedColors.includes(key)}
                  onChange={() => toggleValue(key, setSelectedColors)}
                  sx={{
                    color: "#8b4513",
                    "&.Mui-checked": {
                      color: "#8b4513",
                    },
                  }}
                />
              }
              label={label}
            />
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <Typography gutterBottom>Size</Typography>
          {sizeOptions.map(({ key, label }) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={selectedSizes.includes(key)}
                  onChange={() => toggleValue(key, setSelectedSizes)}
                  sx={{
                    color: "#8b4513",
                    "&.Mui-checked": {
                      color: "#8b4513",
                    },
                  }}
                />
              }
              label={label}
            />
          ))}
        </div>

        <div>
          <Button
            variant="contained"
            onClick={updateFilters}
            sx={{
              mr: 1,
              backgroundColor: "#8b4513",
              color: "white",
              "&:hover": {
                backgroundColor: "#6a340f",
              },
            }}
          >
            Apply Filters
          </Button>
          <Button
            variant="outlined"
            onClick={resetFilters}
            sx={{
              color: "#8b4513",
              borderColor: "#8b4513",
              "&:hover": {
                backgroundColor: "rgba(139, 69, 19, 0.1)",
                borderColor: "#6a340f",
              },
            }}
          >
            Reset
          </Button>
        </div>
      </Collapse>
    </div>
  );
};
