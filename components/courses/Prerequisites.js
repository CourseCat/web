import Link from "next/link";
import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import styles from "./Prerequisites.module.css";

const DEFAULT = {
  name: "Parent",
  children: [{ name: "Child 1" }, { name: "Child 2" }],
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => (
  <g>
    <circle r={15}></circle>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
        {/* View Course */}
        <Link href={`/courses/${nodeDatum._id}`}>View Course</Link>
        {nodeDatum.children && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
    </foreignObject>
  </g>
);

const Prerequisites = ({ prerequisites = DEFAULT }) => {
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

  const margin = { top: 100, right: 50, bottom: 100, left: 50 },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  return (
    <div>
      <h3>Prerequisites</h3>
      <div style={{ width: "100%", height: "400px" }}>
        <Tree
          data={prerequisites}
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
      </div>
    </div>
  );
};

export default Prerequisites;
