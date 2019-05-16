```scss
.hairline {
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    transform: scale(0.5);
    border: 1px solid #f00;
  }
}
```
