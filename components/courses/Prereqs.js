import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import styles from "./Prereqs.module.css";

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => (
  <g>
    <circle r={15}></circle>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <Box
        style={{ border: "1px solid black", backgroundColor: "#dedede" }}
        width={100}
      >
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
        {/* <Link href={`/courses/${nodeDatum._id}`}>View Course</Link> */}
        {nodeDatum.children && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </Box>
    </foreignObject>
  </g>
);

export default function Prereqs({ tree }) {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const nodeSize = { x: 200, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };

  // Calculate the initial translation for the tree based on the container size
  useEffect(() => {
    const dimensions = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    setTranslate({
      x: dimensions.width * 0.5,
      y: dimensions.height * 0.1,
    });
  }, []);

  // console.log(tree);

  return (
    <Stack>
      <Box style={{ width: "100%", height: "400px" }}>
        <Tree
          data={tree}
          translate={translate}
          nodeSize={nodeSize}
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
          }
          orientation="vertical"
          pathFunc="straight"
          scale={{ x: 1, y: -1 }}
          rootNodeClassName={styles.node__root}
          branchNodeClassName={styles.node__branch}
          leafNodeClassName={styles.node__leaf}
        />
      </Box>
    </Stack>
  );
}
