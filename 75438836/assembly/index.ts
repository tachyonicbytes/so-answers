import * as console from "./myConsole";

export let img = memory.data<u8>(
  [
    0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,    0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,
    0, 0, 0, 0,  2, 3, 4, 0,  5, 6, 7, 0,  1, 2, 3, 0,  1, 2, 3, 0,    2, 3, 4, 0,  5, 6, 7, 0,  0, 0, 0, 0,  1, 2, 3, 0,  1, 2, 3, 0,
    0, 0, 0, 0,  2, 3, 4, 0,  5, 6, 7, 0,  1, 2, 3, 0,  1, 2, 3, 0,    2, 3, 4, 0,  5, 6, 7, 0,  0, 0, 0, 0,  1, 2, 3, 0,  1, 2, 3, 0,
    0, 0, 0, 0,  2, 3, 4, 0,  5, 6, 7, 0,  1, 2, 3, 0,  1, 2, 3, 0,    2, 3, 4, 0,  5, 6, 7, 0,  0, 0, 0, 0,  1, 2, 3, 0,  1, 2, 3, 0,
    0, 0, 0, 0,  2, 3, 4, 0,  5, 6, 7, 0,  1, 2, 3, 0,  1, 2, 3, 0,    2, 3, 4, 0,  5, 6, 7, 0,  0, 0, 0, 0,  1, 2, 3, 0,  1, 2, 3, 0,


    0, 0, 0, 0,  2, 3, 4, 0,  5, 6, 7, 0,  1, 2, 3, 0,  1, 2, 3, 0,    2, 3, 4, 0,  5, 6, 7, 0,  0, 0, 0, 0,  1, 2, 3, 0,  1, 2, 3, 0,
    0, 0, 0, 0,  2, 3, 4, 0,  5, 6, 7, 0,  1, 2, 3, 0,  1, 2, 3, 0,    2, 3, 4, 0,  5, 6, 7, 0,  0, 0, 0, 0,  1, 2, 3, 0,  1, 2, 3, 0,
    0, 0, 0, 0,  2, 3, 4, 0,  5, 6, 7, 0,  1, 2, 3, 0,  1, 2, 3, 0,    2, 3, 4, 0,  5, 6, 7, 0,  0, 0, 0, 0,  1, 2, 3, 0,  1, 2, 3, 0,
    0, 0, 0, 0,  2, 3, 4, 0,  5, 6, 7, 0,  1, 2, 3, 0,  1, 2, 3, 0,    2, 3, 4, 0,  5, 6, 7, 0,  0, 0, 0, 0,  1, 2, 3, 0,  1, 2, 3, 0,
    0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,    0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0
  ]
)

export function print_img(img: usize, height: i32, width: i32): void {
  let print_result = "";

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      print_result += "("
      for (let k = 0; k < 4; k++) {
        print_result += load<u8>(img + i * width * 4 + j * 4 + k).toString() + " ";
      }
      print_result += ")"
    }
    console.log(print_result);
    print_result = "";
  }
  console.log("---")
}

export function transpose(img: usize, height: i32, width: i32): usize {
  let transposed_img = __alloc(height * width * 4);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      for (let k = 0; k < 4; k++) {
        store<u8>(transposed_img + i * 4 + j * height * 4 + k, load<u8>(img + i * width * 4 + j * 4 + k));
      }
    }
  }
  return transposed_img;
}

export function box_blur_naive(img: usize, blurred_img: usize, height: i32, width: i32): usize {
  memory.fill(blurred_img, 0, height * width * 4);

  /* For every row */
  for (let i = 1; i < height - 1; i++) {
    /* For every column */
    for (let j = 1; j < width - 1; j++) {
      let red = 0;
      let green = 0;
      let blue = 0;
      let alpha = 0;

      red += load<u8>(img + i * width * 4 + j * 4 + 0);
      red += load<u8>(img + (i - 1) * width * 4 + (j) * 4 + 0);
      red += load<u8>(img + (i + 1) * width * 4 + (j) * 4 + 0);
      red += load<u8>(img + (i) * width * 4 + (j - 1) * 4 + 0);
      red += load<u8>(img + (i) * width * 4 + (j + 1) * 4 + 0);

      green += load<u8>(img + i * width * 4 + j * 4 + 1);
      green += load<u8>(img + (i - 1) * width * 4 + (j) * 4 + 1);
      green += load<u8>(img + (i + 1) * width * 4 + (j) * 4 + 1);
      green += load<u8>(img + (i) * width * 4 + (j - 1) * 4 + 1);
      green += load<u8>(img + (i) * width * 4 + (j + 1) * 4 + 1);

      blue += load<u8>(img + i * width * 4 + j * 4 + 2);
      blue += load<u8>(img + (i - 1) * width * 4 + (j) * 4 + 2);
      blue += load<u8>(img + (i + 1) * width * 4 + (j) * 4 + 2);
      blue += load<u8>(img + (i) * width * 4 + (j - 1) * 4 + 2);
      blue += load<u8>(img + (i) * width * 4 + (j + 1) * 4 + 2);

      alpha += load<u8>(img + i * width * 4 + j * 4 + 3);
      alpha += load<u8>(img + (i - 1) * width * 4 + (j) * 4 + 3);
      alpha += load<u8>(img + (i + 1) * width * 4 + (j) * 4 + 3);
      alpha += load<u8>(img + (i) * width * 4 + (j - 1) * 4 + 3);
      alpha += load<u8>(img + (i) * width * 4 + (j + 1) * 4 + 3);

      store<u8>(blurred_img + i * width * 4 + j * 4 + 0, (red / 5) as u8);
      store<u8>(blurred_img + i * width * 4 + j * 4 + 1, (green / 5) as u8);
      store<u8>(blurred_img + i * width * 4 + j * 4 + 2, (blue / 5) as u8);
      store<u8>(blurred_img + i * width * 4 + j * 4 + 3, (alpha / 5) as u8);
    }
  }

  return blurred_img;
}

export function box_blur_improved(img: usize, blurred_img: usize, transposed_img: usize, height: i32, width: i32): usize {
  memory.fill(blurred_img, 0, height * width * 4);

  /* For every row */
  for (let i = 1; i < height - 1; i++) {
    /* For every column */
    for (let j = 1; j < width - 1; j++) {
      let red = 0;
      let green = 0;
      let blue = 0;
      let alpha = 0;

      red += load<u8>(img + i * width * 4 + j * 4 + 0);
      red += load<u8>(img + (i - 1) * width * 4 + (j) * 4 + 0);
      red += load<u8>(img + (i + 1) * width * 4 + (j) * 4 + 0);

      green += load<u8>(img + i * width * 4 + j * 4 + 1);
      green += load<u8>(img + (i - 1) * width * 4 + (j) * 4 + 1);
      green += load<u8>(img + (i + 1) * width * 4 + (j) * 4 + 1);

      blue += load<u8>(img + i * width * 4 + j * 4 + 2);
      blue += load<u8>(img + (i - 1) * width * 4 + (j) * 4 + 2);
      blue += load<u8>(img + (i + 1) * width * 4 + (j) * 4 + 2);

      alpha += load<u8>(img + i * width * 4 + j * 4 + 3);
      alpha += load<u8>(img + (i - 1) * width * 4 + (j) * 4 + 3);
      alpha += load<u8>(img + (i + 1) * width * 4 + (j) * 4 + 3);

      store<u8>(blurred_img + i * width * 4 + j * 4 + 0, (red) as u8);
      store<u8>(blurred_img + i * width * 4 + j * 4 + 1, (green) as u8);
      store<u8>(blurred_img + i * width * 4 + j * 4 + 2, (blue) as u8);
      store<u8>(blurred_img + i * width * 4 + j * 4 + 3, (alpha) as u8);
    }
  }

  /* For every row in the transposition */
  for (let i = 1; i < width - 1; i++) {
    /* For every column */
    for (let j = 1; j < height - 1; j++) {
      let red = 0;
      let green = 0;
      let blue = 0;
      let alpha = 0;

      red += load<u8>(transposed_img + (i - 1) * height * 4 + (j) * 4 + 0);
      red += load<u8>(transposed_img + (i + 1) * height * 4 + (j) * 4 + 0);

      green += load<u8>(transposed_img + (i - 1) * height * 4 + (j) * 4 + 1);
      green += load<u8>(transposed_img + (i + 1) * height * 4 + (j) * 4 + 1);

      blue += load<u8>(transposed_img + (i - 1) * height * 4 + (j) * 4 + 2);
      blue += load<u8>(transposed_img + (i + 1) * height * 4 + (j) * 4 + 2);

      alpha += load<u8>(transposed_img + (i - 1) * height * 4 + (j) * 4 + 3);
      alpha += load<u8>(transposed_img + (i + 1) * height * 4 + (j) * 4 + 3);

      store<u8>(blurred_img + j * width * 4 + i * 4 + 0, ((load<u8>(blurred_img + j * width * 4 + i * 4 + 0) + red) / 5) as u8);
      store<u8>(blurred_img + j * width * 4 + i * 4 + 1, ((load<u8>(blurred_img + j * width * 4 + i * 4 + 1) + green) / 5) as u8);
      store<u8>(blurred_img + j * width * 4 + i * 4 + 2, ((load<u8>(blurred_img + j * width * 4 + i * 4 + 2) + blue) / 5) as u8);
      store<u8>(blurred_img + j * width * 4 + i * 4 + 3, ((load<u8>(blurred_img + j * width * 4 + i * 4 + 3) + alpha) / 5) as u8);
    }
  }

  return blurred_img;
}

export function box_blur_simd(img: usize, blurred_img: usize, transposed_img: usize, height: i32, width: i32): usize {
  memory.fill(blurred_img, 0, height * width * 4);

  /* For every row */
  for (let i = 1; i < height - 1; i++) {
    /* For every column */
    for (let k = 0; k < (width - 2) / 4; k++) {
      let line: v128;
      let line_before: v128;
      let line_after: v128;

      line = v128.load(img + i * width * 4 + 4 + k * 16);
      line_before = v128.load(img + (i - 1) * width * 4 + 4 + k * 16);
      line_after = v128.load(img + (i + 1) * width * 4 + 4 + k * 16);

      v128.store(blurred_img + i * width * 4 + 4 + k * 16, v128.add<u8>(line, v128.add<u8>(line_before, line_after)));
    }
  }

  /* For every row in the transposition */
  for (let i = 1; i < width - 1; i++) {
    /* For every column */
    for (let j = 1; j < height - 1; j++) {
      let red = 0;
      let green = 0;
      let blue = 0;
      let alpha = 0;

      red += load<u8>(transposed_img + (i - 1) * height * 4 + (j) * 4 + 0);
      red += load<u8>(transposed_img + (i + 1) * height * 4 + (j) * 4 + 0);

      green += load<u8>(transposed_img + (i - 1) * height * 4 + (j) * 4 + 1);
      green += load<u8>(transposed_img + (i + 1) * height * 4 + (j) * 4 + 1);

      blue += load<u8>(transposed_img + (i - 1) * height * 4 + (j) * 4 + 2);
      blue += load<u8>(transposed_img + (i + 1) * height * 4 + (j) * 4 + 2);

      alpha += load<u8>(transposed_img + (i - 1) * height * 4 + (j) * 4 + 3);
      alpha += load<u8>(transposed_img + (i + 1) * height * 4 + (j) * 4 + 3);

      store<u8>(blurred_img + j * width * 4 + i * 4 + 0, ((load<u8>(blurred_img + j * width * 4 + i * 4 + 0) + red) / 5) as u8);
      store<u8>(blurred_img + j * width * 4 + i * 4 + 1, ((load<u8>(blurred_img + j * width * 4 + i * 4 + 1) + green) / 5) as u8);
      store<u8>(blurred_img + j * width * 4 + i * 4 + 2, ((load<u8>(blurred_img + j * width * 4 + i * 4 + 2) + blue) / 5) as u8);
      store<u8>(blurred_img + j * width * 4 + i * 4 + 3, ((load<u8>(blurred_img + j * width * 4 + i * 4 + 3) + alpha) / 5) as u8);
    }
  }

  return blurred_img;
}

export function main(): void {
  let height = 10;
  let width = 10;
  let BENCH = 100000000;
  // print_img(img, height, width);
  // let transposed_img = transpose(img, height, width);
  // print_img(transposed_img, height, width);
  let blurred_img = __alloc(height * width * 4);
  // for (let i = 0; i < BENCH; i++) { // 29.430s
    // box_blur_naive(img, blurred_img, height, width);
  // }

  let transposed_img = transpose(img, height, width);

  // print_img(blurred_img, height, width);
  // for (let i = 0; i < BENCH; i++) { // 30.225s
    // box_blur_improved(img, blurred_img, transposed_img, height, width);
  // }
  // print_img(blurred_img2, height, width);
  for (let i = 0; i < BENCH; i++) { // 17.637s
    box_blur_simd(img, blurred_img, transposed_img, height, width);
  }
  // print_img(blurred_img3, height, width);
}
