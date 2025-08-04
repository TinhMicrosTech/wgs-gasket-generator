import express from 'express';
const router = express.Router();

const gasketStandards = [
  {
    code: "DIN-11851",
    name: "DIN 11851",
    params: { outerRadius: 80, innerRadius: 60, holeCount: 4, holeRadius: 7 }
  },
  {
    code: "JIS-10K",
    name: "JIS 10K",
    params: { outerRadius: 90, innerRadius: 65, holeCount: 4, holeRadius: 8 }
  }
  // Thêm các mẫu khác nếu muốn
];

router.get('/', (req, res) => {
  res.json(gasketStandards);
});

export default router;