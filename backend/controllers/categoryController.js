import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description, slug: slugify(name) });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };
    if (payload.name) payload.slug = slugify(payload.name);

    const category = await Category.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({ success: true, count: brands.length, data: brands });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = await Brand.create({ name, slug: slugify(name) });
    res.status(201).json({ success: true, data: brand });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };
    if (payload.name) payload.slug = slugify(payload.name);

    const brand = await Brand.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }
    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }
    res.status(200).json({ success: true, message: "Brand deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
