-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2023 at 04:20 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_new_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id_banner` int(11) NOT NULL,
  `nm_produk` varchar(100) NOT NULL,
  `deskripsi` varchar(250) NOT NULL,
  `pic_banner` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id_banner`, `nm_produk`, `deskripsi`, `pic_banner`) VALUES
(1, 'Samsung Galaxy S21', 'Smartphone kamera 64MP, layar Dynamic AMOLED 6.2 inci, RAM 8GB, memori internal 128GB.', '1684327760124-Samsung Galaxy S21.webp'),
(2, 'Samsung Galaxy A52', 'Smartphone kamera 64MP, layar Super AMOLED 6.5 inci, RAM 6GB, memori internal 128GB.', '1684328196457-Samsung Galaxy A52.png'),
(3, 'Xiaomi Redmi Note 10 Pro', 'Smartphone kamera 108MP, layar Super AMOLED 6.67 inci, RAM 8GB, memori internal 128GB.', '1684327852748-Xiaomi Redmi Note 10 Pro.png'),
(4, 'Xiaomi Mi 11', 'Smartphone kamera 108MP, layar AMOLED 6.81 inci, RAM 12GB, memori internal 256GB.', '1684327882829-Xiaomi Mi 11.png');

-- --------------------------------------------------------

--
-- Table structure for table `product_detail`
--

CREATE TABLE `product_detail` (
  `id_detail` int(11) NOT NULL,
  `code` varchar(10) NOT NULL,
  `category` varchar(100) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `color` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_detail`
--

INSERT INTO `product_detail` (`id_detail`, `code`, `category`, `brand`, `color`, `status`) VALUES
(1, '99726', 'Cases & Covers', 'iPhone X', 'Red', 'Instock'),
(3, '123545', 'Phone', 'Samsung Galaxy', 'Blue', 'Out of Stock');

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id_produk` int(11) NOT NULL,
  `nm_produk` varchar(100) NOT NULL,
  `deskripsi` varchar(250) NOT NULL,
  `harga` int(11) NOT NULL,
  `code` varchar(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `stok` int(5) NOT NULL,
  `pic_produk` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id_produk`, `nm_produk`, `deskripsi`, `harga`, `code`, `category`, `color`, `stok`, `pic_produk`) VALUES
(8, 'Samsung Galaxy S21', 'Smartphone kamera 64MP, layar Dynamic AMOLED 6.2 inci, RAM 8GB, memori internal 128GB.', 11999000, 'C0001', 'Handphone', 'Red', 15, '1684287955176-Samsung Galaxy S21.webp'),
(9, 'Samsung Galaxy A52', 'Smartphone kamera 64MP, layar Super AMOLED 6.5 inci, RAM 6GB, memori internal 128GB.', 4499000, 'C0002', 'Handphone', 'Black', 12, '1684288896460-Samsung Galaxy A52.png'),
(10, 'Xiaomi Redmi Note 10 Pro', 'Smartphone kamera 108MP, layar Super AMOLED 6.67 inci, RAM 8GB, memori internal 128GB.', 3999000, 'C0003', 'Handphone', 'Blue', 20, '1684218976983-Xiaomi Redmi Note 10 Pro.png'),
(11, 'Xiaomi Mi 11', 'Smartphone kamera 108MP, layar AMOLED 6.81 inci, RAM 12GB, memori internal 256GB.', 9499000, 'C0004', 'Handphone', 'White', 7, '1684288685584-Xiaomi Mi 11.png'),
(12, 'Oppo Reno6', 'Smartphone kamera 64MP, layar AMOLED 6.43 inci, RAM 8GB, memori internal 128GB.', 5499000, 'C0005', 'Handphone', 'Black', 9, '1684288434396-Oppo Reno6.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jk` varchar(1) CHARACTER SET utf8 NOT NULL,
  `umur` int(3) NOT NULL,
  `roles` varchar(50) NOT NULL,
  `pic_user` varchar(255) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `email`, `jk`, `umur`, `roles`, `pic_user`, `password`) VALUES
(20, 'Stefan', 'stefanleonard935@gmail.com', 'L', 17, 'Admin', '1684287749720-stefan.jpg', '$2a$10$wxaSmI/VWPRTKrbs3QCGGO3ifa1wBaBE2hFKm38vURBaiVqLItX1y'),
(22, 'Albert', 'albert@gmail.com', 'L', 17, 'User', '1684943429839-albert.jpg', '$2a$10$sueZ1Pfk.OVVsnUHEPWl2O8J4GsQYUJwAkWUHez1iFymacSk7I0Qi'),
(23, 'Arya', 'arya@gmail.com', 'L', 17, 'User', '1684944376549-arya.jpg', '$2a$10$mJqP0ot4dSDe0Y3l0O91yeHcL1IkCz600BP.F.dTdoOzN2Hs8pvA2'),
(24, 'Aldi', 'aldi@gmail.com', 'L', 17, 'Admin', '1685014016296-aldi & pak beny.jpg', '$2a$10$PRmepa5oNDcOM18UgYuqLOQO3Qn7nxiJlp/L.qAXgBkTsEwcCVR9q'),
(26, 'SFN', 'sfn@gmail.com', 'P', 15, 'User', '1685071090623-william.jpg', '$2a$10$AnzUNm4LIj9u2famBRoyc.UFKKSEoEaq0dcNpxjydkCub/4LrMMCq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id_banner`);

--
-- Indexes for table `product_detail`
--
ALTER TABLE `product_detail`
  ADD PRIMARY KEY (`id_detail`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id_banner` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_detail`
--
ALTER TABLE `product_detail`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id_produk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
