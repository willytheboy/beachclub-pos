export const RENDER_WIDTH = 1080;
export const RENDER_HEIGHT = 1920;

export const templates = {
  1: [{ x: 0, y: 0, width: RENDER_WIDTH, height: RENDER_HEIGHT }],
  2: [
    { x: 0, y: 0, width: RENDER_WIDTH, height: RENDER_HEIGHT / 2 },
    { x: 0, y: RENDER_HEIGHT / 2, width: RENDER_WIDTH, height: RENDER_HEIGHT / 2 },
  ],
  3: [
    { x: 0, y: 0, width: RENDER_WIDTH, height: RENDER_HEIGHT / 3 },
    { x: 0, y: RENDER_HEIGHT / 3, width: RENDER_WIDTH, height: RENDER_HEIGHT / 3 },
    { x: 0, y: 2 * RENDER_HEIGHT / 3, width: RENDER_WIDTH, height: RENDER_HEIGHT / 3 },
  ],
  4: [
    { x: 0, y: 0, width: RENDER_WIDTH / 2, height: RENDER_HEIGHT / 2 },
    { x: RENDER_WIDTH / 2, y: 0, width: RENDER_WIDTH / 2, height: RENDER_HEIGHT / 2 },
    { x: 0, y: RENDER_HEIGHT / 2, width: RENDER_WIDTH / 2, height: RENDER_HEIGHT / 2 },
    { x: RENDER_WIDTH / 2, y: RENDER_HEIGHT / 2, width: RENDER_WIDTH / 2, height: RENDER_HEIGHT / 2 },
  ],
};
