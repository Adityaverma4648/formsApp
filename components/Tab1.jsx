import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import { TrashIcon } from "react-native-heroicons/outline";
import CheckBox from "react-native-checkbox-component";

const Tab1 = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  const handleInputChange = (value, field, index) => {
    const updatedData = [...data];
    if (field === "selectedOptions" || field === "selectedCells") {
      // Handle array type updates (checkboxes or grid)
      updatedData[0].questions[index].data[field] = value;
    } else {
      // For other fields like text input or date
      updatedData[0].questions[index].data[field] = value;
    }
    setData(updatedData);
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData[0].questions.splice(index, 1);
    setData(updatedData);
  };
  return (
    <>
      {initialData[0].questions?.map((d, index) => (
        <View
          key={index}
          className="bg-white w-[90%] h-[200px] flex flex-col justify-start items-center my-2 rounded-md overflow-hidden"
        >
          <View className="w-full flex flex-row justify-between items-start bg-white">
            <View className="bg-violet-800 py-2 flex justify-center items-center">
              <Text className="text-white w-auto h-[20px] text-center px-2 rounded-sm">
                Question {index + 1}
              </Text>
            </View>
            <View className="flex-1 bg-gray-200 py-2 flex justify-end items-end">
              <Text className="bg-violet-800 text-white w-auto h-[20px] text-center px-2 rounded-sm">
                {d.type}
              </Text>
            </View>
          </View>

          {/* <View className="bg-white flex-1 w-full flex justify-center items-center">
            {d.type === "info" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="question"
                  value={d.question}
                  placeholder="Question"
                  onChangeText={(text) =>
                    handleInputChange(text, "question", index)
                  }
                />
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="description"
                  value={d.description}
                  placeholder="Descrition (Optional)"
                  onChangeText={(text) =>
                    handleInputChange(text, "description", index)
                  }
                />
              </>
            )}

            {d.type === "image" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="title"
                  value={d.title}
                  placeholder="Title"
                  onChangeText={(text) =>
                    handleInputChange(text, "title", index)
                  }
                />
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="image"
                  placeholder="Upload"
                  value={d.description}
                  onChangeText={(text) =>
                    handleInputChange(text, "description", index)
                  }
                />
              </>
            )}

            {d.type === "video" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="title"
                  value={d.title}
                  placeholder="Title"
                  onChangeText={(text) =>
                    handleInputChange(text, "title", index)
                  }
                />
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="video"
                  placeholder="Upload"
                  value={d.description}
                  onChangeText={(text) =>
                    handleInputChange(text, "description", index)
                  }
                />
              </>
            )}

            {d.type === "section" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="question"
                  value={d.question}
                  placeholder="Question"
                  onChangeText={(text) =>
                    handleInputChange(text, "question", index)
                  }
                />
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="description"
                  value={""}
                  onChangeText={(text) =>
                    handleInputChange(text, "section", index)
                  }
                  placeholder="Description (Optional)"
                />
              </>
            )}

            {d.type === "checkbox" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="question"
                  value={d.question}
                  placeholder="Question"
                  onChangeText={(text) =>
                    handleInputChange(text, "question", index)
                  }
                />
                {d.data.options.map((option, idx) => (
                  <View
                    key={idx}
                    className="flex flex-1 flex-row items-center bg-red-900 w-[80%]"
                  >
                    <CheckBox
                      className="bg-green-400"
                      value={d.data.selectedOptions?.includes(option)}
                      onValueChange={(newValue) => {
                        const updatedOptions = newValue
                          ? [...(d.data.selectedOptions || []), option]
                          : d.data.selectedOptions.filter(
                              (opt) => opt !== option
                            );
                        handleInputChange(
                          updatedOptions,
                          "selectedOptions",
                          index
                        );
                      }}
                    />
                    <Text>{option}</Text>
                  </View>
                ))}
              </>
            )}

            {d.type === "checkbox-grid" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="title"
                  value={d.title}
                  placeholder="Title"
                  onChangeText={(text) =>
                    handleInputChange(text, "title", index)
                  }
                />
                {d.data.rows.map((row, rowIndex) => (
                  <View key={rowIndex} className="flex flex-row items-center">
                    <Text>{row}</Text>
                    {d.data.columns.map((column, colIndex) => (
                      <CheckBox
                        key={colIndex}
                        value={d.data.selectedCells?.[rowIndex]?.[colIndex]}
                        onValueChange={(newValue) => {
                          const updatedCells = [
                            ...(d.data.selectedCells || []),
                          ];
                          updatedCells[rowIndex] = updatedCells[rowIndex] || [];
                          updatedCells[rowIndex][colIndex] = newValue;
                          handleInputChange(
                            updatedCells,
                            "selectedCells",
                            index
                          );
                        }}
                      />
                    ))}
                  </View>
                ))}
              </>
            )}

            {d.type === "date" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="title"
                  value={d.title}
                  placeholder="Title"
                  onChangeText={(text) =>
                    handleInputChange(text, "title", index)
                  }
                />
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="date"
                  value={d.data.date}
                  onChangeText={(text) =>
                    handleInputChange(text, "date", index)
                  }
                  placeholder="Enter date"
                />
              </>
            )}

            {d.type === "time" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="title"
                  value={d.title}
                  placeholder="Title"
                  onChangeText={(text) =>
                    handleInputChange(text, "title", index)
                  }
                />
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="time"
                  value={d.data.time}
                  onChangeText={(text) =>
                    handleInputChange(text, "time", index)
                  }
                  placeholder="Enter time"
                />
              </>
            )}

            {d.type === "dropdown" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="question"
                  value={d.question}
                  placeholder="Question"
                  onChangeText={(text) =>
                    handleInputChange(text, "question", index)
                  }
                />
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  value={d.data.selectedOption}
                  onChangeText={(text) =>
                    handleInputChange(text, "selectedOption", index)
                  }
                  placeholder="Select an option"
                />
              </>
            )}

            {d.type === "radio" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="question"
                  value={d.question}
                  placeholder="Question"
                  onChangeText={(text) =>
                    handleInputChange(text, "question", index)
                  }
                />
                {d.data.options.map((option, idx) => (
                  <View key={idx} className="flex flex-row items-center">
                    <CheckBox
                      value={d.data.selectedOption === option}
                      onValueChange={() =>
                        handleInputChange(option, "selectedOption", index)
                      }
                    />
                    <Text>{option}</Text>
                  </View>
                ))}
              </>
            )}

            {d.type === "text" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="question"
                  value={d.question}
                  placeholder="Question"
                  onChangeText={(text) =>
                    handleInputChange(text, "question", index)
                  }
                />
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  placeholder={d.data.placeholder}
                  value={d.data.textAnswer}
                  onChangeText={(text) =>
                    handleInputChange(text, "textAnswer", index)
                  }
                />
              </>
            )}

            {d.type === "multiple-choice" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="question"
                  value={d.question}
                  placeholder="Question"
                  onChangeText={(text) =>
                    handleInputChange(text, "question", index)
                  }
                />
                {d.data.options.map((option, idx) => (
                  <View key={idx} className="flex flex-row items-center">
                    <CheckBox
                      value={d.data.selectedOptions?.includes(option)}
                      onValueChange={(newValue) => {
                        const updatedOptions = newValue
                          ? [...(d.data.selectedOptions || []), option]
                          : d.data.selectedOptions.filter(
                              (opt) => opt !== option
                            );
                        handleInputChange(
                          updatedOptions,
                          "selectedOptions",
                          index
                        );
                      }}
                    />
                    <Text>{option}</Text>
                  </View>
                ))}
              </>
            )}

            {d.type === "multiple-choice-grid" && (
              <>
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="title"
                  value={d.title}
                  placeholder="Title"
                  onChangeText={(text) =>
                    handleInputChange(text, "title", index)
                  }
                />
                {d.data.rows.map((row, rowIndex) => (
                  <View key={rowIndex} className="flex flex-row items-center">
                    <Text>{row}</Text>
                    {d.data.columns.map((column, colIndex) => (
                      <CheckBox
                        key={colIndex}
                        value={d.data.selectedCells?.[rowIndex]?.[colIndex]}
                        onValueChange={(newValue) => {
                          const updatedCells = [
                            ...(d.data.selectedCells || []),
                          ];
                          updatedCells[rowIndex] = updatedCells[rowIndex] || [];
                          updatedCells[rowIndex][colIndex] = newValue;
                          handleInputChange(
                            updatedCells,
                            "selectedCells",
                            index
                          );
                        }}
                      />
                    ))}
                  </View>
                ))}
              </>
            )}
          </View> */}

          <View className="bg-white flex-1 w-full flex justify-center items-center">
            <View className="w-full flex justify-center items-center">
              {d.type === "info"|| d.type === "section" || d.type === "checkbox"|| d.type === "checkbox-grid" || d.type === "date"|| d.type === "time" || d.type === "multiple-choice-grid"|| d.type === "multiple-choice" || d .type === "radio"|| d.type === "text" || d.type === "dropdown" ? (
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="question"
                  value={d.question}
                  placeholder="Question"
                  onChangeText={(text) =>
                    handleInputChange(text, "question", index)
                  }
                />
              ) : (
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="title"
                  value={d.title}
                  placeholder="Title"
                  onChangeText={(text) =>
                    handleInputChange(text, "title", index)
                  }
                />
              )}
            </View>

            <View className="w-full flex justify-center items-center">
              {d.type === "info"|| d.type === "section" ? (
                <TextInput
                className="bg-white w-[90%] border-b border-gray-200"
                name="description"
                value={d.description}
                placeholder="Descrition (Optional)"
                onChangeText={(text) =>
                  handleInputChange(text, "description", index)
                }
              />
              ) : (
                <TextInput
                  className="bg-white w-[90%] border-b border-gray-200"
                  name="title"
                  value={d.title}
                  placeholder="Title"
                  onChangeText={(text) =>
                    handleInputChange(text, "title", index)
                  }
                />
              )}
            </View>
          </View>

          <View className="w-[90%] h-[40px] flex flex-row justify-between items-center border-t border-1 border-gray-200">
            {d.type === "checkbox" ||
              d.type === "checkbox-grid" ||
              d.type === "multiple-choice" ||
              d.type === "multiple-choice-grid" ||
              (d.type === "radio" && (
                <TouchableOpacity className="" onPress={() => {}}>
                  <Text>Create</Text>
                </TouchableOpacity>
              ))}
            <TouchableOpacity onPress={() => handleDelete(index)}>
              <TrashIcon color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
};

export default Tab1;
