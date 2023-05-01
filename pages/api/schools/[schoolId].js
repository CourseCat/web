import { getSchoolById } from "../../../utils/schools";

export default async function handler(req, res) {
  const { schoolId } = req.query;

  console.log("schoolId", schoolId);

  if (!schoolId) {
    return res.status(400).json({ error: "Missing schoolId parameter" });
  }

  try {
    const school = await getSchoolById(schoolId);
    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }
    return res.status(200).json(school);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
