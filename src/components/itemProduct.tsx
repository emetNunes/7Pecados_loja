import { Button } from "@heroui/button";

type ItemProductProps = {
  title: string;
  listArray: string[];
};

export const ItemProduct = ({ title, listArray }: ItemProductProps) => {
  return (
    <div>
      <div className="flex">
        <div>
          <h2>{title}</h2>
          <div className="flex gap-2">
            {listArray.map((element) => (
              <Button className="flex rounded-lg" variant="bordered">
                {element}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
