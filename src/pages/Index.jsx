import React, { useRef, useState, useEffect } from "react";
import { Container, Box, Flex, Button, VStack } from "@chakra-ui/react";


const mondrianColors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState(mondrianColors[0]);
  const [brushSize, setBrushSize] = useState(brushSizes[2]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Container maxW="100vw" maxH="100vh" p={0} m={0} centerContent>
      <Box
        as="canvas"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: "1px solid #000" }}
      />
      <Flex
        position="absolute"
        bottom="0"
        width="100%"
        bg="rgba(255, 255, 255, 0.8)"
        p={2}
        justifyContent="space-around"
      >
        <Flex>
          {mondrianColors.map((c) => (
            <Button
              key={c}
              bg={c}
              size="lg"
              m={1}
              onClick={() => setColor(c)}
              border={color === c ? "2px solid #000" : "none"}
            />
          ))}
        </Flex>
        <Flex>
          {brushSizes.map((size) => (
            <Button
              key={size}
              size="lg"
              m={1}
              onClick={() => setBrushSize(size)}
              border={brushSize === size ? "2px solid #000" : "none"}
            >
              {size}
            </Button>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Index;