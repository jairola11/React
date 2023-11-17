-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-11-2023 a las 17:11:49
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prenderia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler`
--

CREATE TABLE `alquiler` (
  `idAlquiler` int(11) NOT NULL,
  `valor` decimal(10,1) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `meses` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `interes` decimal(10,1) NOT NULL,
  `fkCliente` int(11) NOT NULL,
  `fkArticulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alquiler`
--

INSERT INTO `alquiler` (`idAlquiler`, `valor`, `fecha`, `meses`, `descripcion`, `interes`, `fkCliente`, `fkArticulo`) VALUES
(1, '40000.0', '2023-11-03 13:13:57', 5, 'vehiculo de alta gama ', '5.0', 1, 1),
(2, '40000.0', '2023-11-03 13:15:04', 5, 'vehiculo de alta gama ', '5.0', 1, 1),
(3, '30000.0', '2022-06-12 05:00:00', 5, 'vehiculo de alta gama ', '5.0', 1, 1),
(4, '30000.0', '2022-07-18 05:00:00', 5, 'vehiculo de alta gama ', '5.0', 1, 1),
(5, '30000.0', '2022-07-18 05:00:00', 5, 'vehiculo de media gama  ', '5.0', 1, 1),
(6, '30000.0', '2022-07-18 05:00:00', 5, 'vehiculo de media gama  ', '5.0', 1, 1),
(7, '30000.0', '2022-07-18 05:00:00', 5, 'vehiculo de media gama  ', '5.0', 1, 1),
(8, '30000.0', '2022-07-18 05:00:00', 5, 'vehiculo de media gama  ', '5.0', 1, 1),
(9, '30000.0', '2022-07-18 05:00:00', 5, 'vehiculo de media gama  ', '5.0', 1, 1),
(10, '30000.0', '2022-07-18 05:00:00', 5, 'vehiculo de media gama  ', '5.0', 1, 1),
(12, '30000.0', '2022-07-18 05:00:00', 5, 'vehiculo de media gama  ', '5.0', 1, 1),
(13, '300000.0', '2022-07-18 05:00:00', 4, 'vehiculo de media gama  ', '5.0', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `idArticulo` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `tipo` enum('vehiculo','oro','electrodomesticos','maquinaria','heramienta') NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`idArticulo`, `nombre`, `tipo`, `status`) VALUES
(1, 'mazda', 'vehiculo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL,
  `identificacion` int(11) NOT NULL,
  `nombres` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `fechaNa` date NOT NULL,
  `password` varchar(45) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idCliente`, `identificacion`, `nombres`, `direccion`, `telefono`, `fechaNa`, `password`, `status`) VALUES
(1, 3, 'wilson', 'leon13', '3123', '2001-07-20', '123', 1),
(2, 3, 'wilson', 'leon124', '3123', '2001-07-20', '123455', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `intereses`
--

CREATE TABLE `intereses` (
  `idInteres` int(11) NOT NULL,
  `mes` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `fkAlquiler` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `intereses`
--

INSERT INTO `intereses` (`idInteres`, `mes`, `fecha`, `valor`, `fkAlquiler`) VALUES
(1, 5, '2023-05-12', '5000000.00', 1),
(6, 5, '2023-11-24', '15000.00', 13),
(7, 7, '2023-11-23', '15000.00', 13);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD PRIMARY KEY (`idAlquiler`),
  ADD KEY `tener1` (`fkCliente`),
  ADD KEY `tener2` (`fkArticulo`);

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`idArticulo`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `intereses`
--
ALTER TABLE `intereses`
  ADD PRIMARY KEY (`idInteres`),
  ADD KEY `tener3` (`fkAlquiler`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquiler`
--
ALTER TABLE `alquiler`
  MODIFY `idAlquiler` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `idArticulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `intereses`
--
ALTER TABLE `intereses`
  MODIFY `idInteres` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD CONSTRAINT `tener1` FOREIGN KEY (`fkCliente`) REFERENCES `clientes` (`idCliente`),
  ADD CONSTRAINT `tener2` FOREIGN KEY (`fkArticulo`) REFERENCES `articulos` (`idArticulo`);

--
-- Filtros para la tabla `intereses`
--
ALTER TABLE `intereses`
  ADD CONSTRAINT `tener3` FOREIGN KEY (`fkAlquiler`) REFERENCES `alquiler` (`idAlquiler`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
