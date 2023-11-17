-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2023 a las 14:33:45
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
-- Base de datos: `videojuegos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler`
--

CREATE TABLE `alquiler` (
  `idalquiler` int(11) NOT NULL,
  `fecha_alquiler` date DEFAULT NULL,
  `fecha_devolucion` date DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `estado` enum('reserva','prestamo','devolucion') DEFAULT NULL,
  `fk_usuario` int(11) DEFAULT NULL,
  `fk_juego` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alquiler`
--

INSERT INTO `alquiler` (`idalquiler`, `fecha_alquiler`, `fecha_devolucion`, `cantidad`, `estado`, `fk_usuario`, `fk_juego`) VALUES
(3, '2023-08-01', '2023-09-01', 2, 'devolucion', 45866, 2),
(5, '2020-03-30', '2023-09-08', 7, 'devolucion', 7864545, 2),
(6, '2021-11-01', '2023-09-08', 9, 'prestamo', 7864545, 8),
(8, '2018-03-02', NULL, 7, 'reserva', 45866, 8),
(10, '2017-08-08', '2023-09-09', 2, 'devolucion', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `idjuego` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`idjuego`, `nombre`, `descripcion`, `imagen`, `precio`) VALUES
(1, 'Resident Evil 4', 'Juego de terror y zombies', NULL, '20.00'),
(2, 'Need for speed', 'Juego de carreras con carros', NULL, '30.99'),
(3, 'Super Mario Bros', 'Juego de aventura colaborativo', NULL, '9.99'),
(4, 'Fortnite', 'Battle Royal', NULL, '10.99'),
(5, 'GTA V', 'Estafa de rockstar games.', NULL, '20.99'),
(7, 'Assasins Creed', 'Juego de historia y mundo abierto', '41cd5fadd7fe0384f9db1c5b4c7779b4.jpg', '99.99'),
(8, 'FC 24', 'Juego de fúbol', 'fc24.jpg', '200.00'),
(11, 'Fortnite - Salvar al mundo', 'Obtención de monedas-V', 'Fortnite.jpg', '30.00'),
(13, 'battle field', 'juego de guerra', 'battlefield.jpg', '9.99');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL,
  `nombres` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `correo` varchar(60) DEFAULT NULL,
  `rol` enum('administrador','usuario') DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `nombres`, `direccion`, `telefono`, `correo`, `rol`, `password`) VALUES
(1, 'Juana De arco', 'Medellin', '3247894514', 'juana1@gmail.com', 'usuario', '123'),
(2, 'Maria Serrano', 'Timaná', '300000000', 'maria@gmail.com', 'administrador', '111'),
(3, 'Soranyi', 'Yamboró', '444444', 'soranyi@gmail.com', 'administrador', NULL),
(11, 'Daniel', 'Palestina', '234234234', 'daniel@gmail.com', 'usuario', '222'),
(47, 'Carlitos', 'Huila', '5555555', 'carlos@gmail.com', 'usuario', NULL),
(789, 'Casimira', 'Mexico', '45454546', 'asdsad@gmail.com', 'usuario', NULL),
(45866, 'Jose', 'Timana', '165446', 'jose@gmail.com', 'administrador', NULL),
(987654, 'Camilo', 'Pitalito', '000000', 'camilo@gmail.com', 'usuario', NULL),
(7864545, 'Fabian', 'Versalle', '88844', 'fabian@gmail.com', 'usuario', NULL),
(2147483647, 'Casimiro', 'Mexico', '45454546', 'asdsad@gmail.com', 'usuario', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD PRIMARY KEY (`idalquiler`),
  ADD KEY `alquilar` (`fk_usuario`),
  ADD KEY `ser` (`fk_juego`);

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`idjuego`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquiler`
--
ALTER TABLE `alquiler`
  MODIFY `idalquiler` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `idjuego` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD CONSTRAINT `alquilar` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`idusuario`),
  ADD CONSTRAINT `alquiler_ibfk_1` FOREIGN KEY (`fk_juego`) REFERENCES `juegos` (`idjuego`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
