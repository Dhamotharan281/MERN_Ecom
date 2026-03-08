# Newly Added Feature Modules (Additive, No Deletions)

## 1. Authentication & User Management
- Google login endpoint
- Forgot password
- Reset password
- Email verification token flow
- Phone OTP send/verify
- Address add/update/delete APIs
- Profile avatar update support
- Wishlist support in user model + APIs
- Saved payment methods field in user schema

## 2. Product Management Enhancements
- Extended filters: brand, color, size, material, rating, stock availability
- Related products endpoint
- Recently viewed products endpoint
- Review update endpoint
- Review delete/moderation endpoint
- Seller product approval/rejection support

## 3. Category & Brand Module
- Category model + CRUD endpoints
- Brand model + CRUD endpoints
- Public browse endpoints for categories/brands

## 4. Shopping Cart Enhancements
- Save for later
- Move saved item back to cart
- Apply coupon to cart
- Remove coupon from cart
- Cart totals with discount tracking

## 5. Checkout / Coupon / Discount
- Coupon model with:
  - expiry
  - usage limit
  - percentage/fixed discount
  - min order value
  - max discount
- Coupon validation endpoint
- Admin coupon CRUD
- Coupon usage tracking on order placement

## 6. Order Management Enhancements
- Cancel order endpoint (user)
- Return order endpoint (user)
- Invoice download endpoint
- Expanded order statuses:
  - Confirmed
  - Out for delivery
  - Returned
- Delivery partner and tracking support

## 7. Notification Module
- Notification model
- Notification creation service
- User notification list endpoint
- Mark single notification as read
- Mark all as read
- Auto-notifications on:
  - order placed
  - payment success
  - order status update

## 8. Seller Support Foundations
- `SELLER` role in user schema
- Seller-created products marked pending for admin approval

## 9. Security/Architecture Notes
- Existing JWT, rate limit, helmet, bcrypt flow preserved
- New modules added as separate routes/models/controllers
- Existing routes retained (backward-compatible)
