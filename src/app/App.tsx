import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "../assets/images/product-1.jpg";
import img2 from "../assets/images/product-2.jpg";
import img3 from "../assets/images/product-3.jpg";
import img4 from "../assets/images/product-4.jpg";
import img5 from "../assets/images/product-5.jpg";
import img6 from "../assets/images/product-6.jpg";

const products = [
  {
    id: 1,
    name: "ULTRA BLACK",
    series: "SIGNATURE",
    price: "12,900 ₽",
    image: img1,
    description: "100% органический хлопок • 220 г/м²",
  },
  {
    id: 2,
    name: "VOID ESSENTIAL",
    series: "CORE",
    price: "11,500 ₽",
    image: img2,
    description: "Премиум хлопок • 200 г/м²",
  },
  {
    id: 3,
    name: "MINIMAL BLACK",
    series: "CLASSIC",
    price: "10,900 ₽",
    image: img3,
    description: "Качественный хлопок • 180 г/м²",
  },
  {
    id: 4,
    name: "DARK MATTER",
    series: "LIMITED",
    price: "13,500 ₽",
    image: img4,
    description: "Премиум материал • 240 г/м²",
  },
  {
    id: 5,
    name: "SHADOW FORM",
    series: "PREMIUM",
    price: "12,200 ₽",
    image: img5,
    description: "Органический хлопок • 210 г/м²",
  },
  {
    id: 6,
    name: "OBSIDIAN CORE",
    series: "EXCLUSIVE",
    price: "14,900 ₽",
    image: img6,
    description: "100% премиум хлопок • 260 г/м²",
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoplay]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoplay(false);
  };

  const current = products[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
    }),
  };

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-full w-full"
          style={{
            backgroundImage: 'linear-gradient(#00d9ff 1px, transparent 1px), linear-gradient(90deg, #00d9ff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-8 flex items-center justify-between"
      >
        <motion.h1
          className="text-4xl tracking-tighter font-bold"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-white">VOID</span>
          <span className="text-[#00d9ff]">.</span>
        </motion.h1>

        <div className="flex items-center gap-2">
          {[...Array(products.length)].map((_, index) => (
            <motion.div
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer transition-all ${
                index === currentIndex ? "w-12 bg-[#00d9ff]" : "w-2 bg-[#262626] hover:bg-[#404040]"
              } h-2`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        <motion.div
          className="text-sm tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[#737373]">0{currentIndex + 1}</span>
          <span className="text-[#262626] mx-2">/</span>
          <span className="text-[#737373]">0{products.length}</span>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <div className="h-full flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.6 },
            }}
            className="absolute grid md:grid-cols-2 gap-16 items-center px-8 md:px-20 max-w-[1400px]"
            style={{ perspective: "1000px" }}
          >
            {/* Product Image */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Glowing effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 blur-3xl bg-[#00d9ff] opacity-30"
                />

                <img
                  src={current.image}
                  alt={current.name}
                  className="relative w-full h-[600px] object-cover border-2 border-[#00d9ff]"
                />

                {/* Corner decorations */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#00d9ff]"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#00d9ff]"
                />
              </motion.div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.div
                  className="inline-block border-2 border-[#00d9ff] px-6 py-2 mb-6"
                  whileHover={{ scale: 1.05, backgroundColor: "#00d9ff", color: "#000" }}
                >
                  <span className="text-xs tracking-widest">{current.series}</span>
                </motion.div>

                <motion.h2
                  className="text-7xl md:text-8xl tracking-tighter leading-none mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {current.name.split(" ").map((word, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    >
                      {i === 1 ? <span className="text-[#00d9ff]">{word}</span> : word}
                    </motion.div>
                  ))}
                </motion.h2>

                <motion.p
                  className="text-xl text-[#737373] mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {current.description}
                </motion.p>

                <motion.div
                  className="flex items-center gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-5xl tracking-tighter text-[#00d9ff]">
                    {current.price}
                  </div>

                  <motion.button
                    className="bg-[#00d9ff] text-black px-10 py-4 tracking-widest text-sm hover:bg-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    VIEW DETAILS
                  </motion.button>
                </motion.div>

                {/* Size indicators */}
                <motion.div
                  className="flex items-center gap-4 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <span className="text-xs text-[#737373] tracking-widest">SIZES:</span>
                  {["XS", "S", "M", "L", "XL"].map((size, i) => (
                    <motion.div
                      key={size}
                      className="w-10 h-10 border border-[#262626] flex items-center justify-center text-xs hover:border-[#00d9ff] hover:text-[#00d9ff] cursor-pointer transition-colors"
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + i * 0.05 }}
                    >
                      {size}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        onClick={prevSlide}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-50 w-16 h-16 border-2 border-[#262626] hover:border-[#00d9ff] flex items-center justify-center group transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-6 h-6 group-hover:text-[#00d9ff] transition-colors" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        onClick={nextSlide}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 w-16 h-16 border-2 border-[#262626] hover:border-[#00d9ff] flex items-center justify-center group transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-6 h-6 group-hover:text-[#00d9ff] transition-colors" />
      </motion.button>

      {/* Product Navigation Sidebar */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed right-8 bottom-8 z-50 space-y-4"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer border-l-4 pl-4 transition-all ${
              index === currentIndex
                ? "border-[#00d9ff] opacity-100"
                : "border-[#262626] opacity-40 hover:opacity-70 hover:border-[#404040]"
            }`}
            whileHover={{ x: -5 }}
          >
            <div className="text-2xl tracking-tighter">0{index + 1}</div>
            <div className="text-xs text-[#737373] tracking-wide">{product.series}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-1/4 right-1/4 w-2 h-2 bg-[#00d9ff] blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="fixed bottom-1/3 left-1/4 w-2 h-2 bg-[#00d9ff] blur-sm"
      />
    </div>
  );
}
